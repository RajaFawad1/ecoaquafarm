import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder, StandardScaler
import xgboost as xgb
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import random

# Set random seeds for reproducibility
np.random.seed(42)
random.seed(42)

###########################
## 1. Synthetic Data Generation
###########################

def generate_synthetic_football_data(num_matches=1000, num_teams=20, seasons=3):
    """
    Generate synthetic football match data for demonstration purposes.
    In a real scenario, you would replace this with your actual data.
    """
    teams = [f'Team_{i}' for i in range(1, num_teams+1)]
    seasons = [f'Season_{year}' for year in range(2020, 2020+seasons)]
    
    matches = []
    
    for season in seasons:
        # Shuffle teams each season to simulate different performance levels
        random.shuffle(teams)
        
        # Generate team strengths for this season
        team_strengths = {team: np.random.normal(loc=50, scale=15) for team in teams}
        
        # Generate matches - each team plays each other twice (home and away)
        for i in range(num_teams):
            for j in range(i+1, num_teams):
                home_team = teams[i]
                away_team = teams[j]
                
                # Home advantage factor
                home_adv = np.random.normal(loc=0.2, scale=0.05)
                
                # Calculate expected goals based on team strengths
                home_exp = (team_strengths[home_team] / (team_strengths[away_team] + team_strengths[home_team])) + home_adv
                away_exp = 1 - home_exp
                
                # Generate actual goals (Poisson distribution)
                home_goals = np.random.poisson(home_exp * 2.5)
                away_goals = np.random.poisson(away_exp * 2.5)
                
                # Generate match statistics correlated with goals
                home_shots = max(5, home_goals * 5 + int(np.random.normal(5, 3)))
                away_shots = max(5, away_goals * 5 + int(np.random.normal(5, 3)))
                
                home_possession = min(80, max(40, 50 + (home_exp - 0.5) * 30 + np.random.normal(0, 5)))
                away_possession = 100 - home_possession
                
                home_corners = max(0, home_goals * 2 + int(np.random.poisson(3)))
                away_corners = max(0, away_goals * 2 + int(np.random.poisson(3)))
                
                # Determine result
                if home_goals > away_goals:
                    result = 'H'
                elif home_goals == away_goals:
                    result = 'D'
                else:
                    result = 'A'
                
                match_date = datetime(2020, 8, 1) + timedelta(days=random.randint(0, 300))
                
                matches.append({
                    'Date': match_date.strftime('%Y-%m-%d'),
                    'Season': season,
                    'HomeTeam': home_team,
                    'AwayTeam': away_team,
                    'HomeGoals': home_goals,
                    'AwayGoals': away_goals,
                    'Result': result,
                    'HomeShots': home_shots,
                    'AwayShots': away_shots,
                    'HomePossession': home_possession,
                    'AwayPossession': away_possession,
                    'HomeCorners': home_corners,
                    'AwayCorners': away_corners,
                    'HomeFouls': random.randint(8, 20),
                    'AwayFouls': random.randint(8, 20),
                    'HomeYellowCards': random.randint(0, 5),
                    'AwayYellowCards': random.randint(0, 5),
                    'HomeRedCards': random.randint(0, 2),
                    'AwayRedCards': random.randint(0, 2)
                })
    
    return pd.DataFrame(matches)

# Generate synthetic data
print("Generating synthetic football data...")
data = generate_synthetic_football_data(num_matches=1000, num_teams=20)
print(f"Generated {len(data)} matches")

###########################
## 2. Feature Engineering
###########################

def calculate_team_form(df, team, date, seasons, lookback=5):
    """Calculate a team's recent form (points per game over last lookback matches)"""
    team_matches = df[((df['HomeTeam'] == team) | (df['AwayTeam'] == team)) & 
                      (df['Date'] < date) & 
                      (df['Season'].isin(seasons))].sort_values('Date', ascending=False)
    
    if len(team_matches) == 0:
        return 0.5  # Neutral form if no history
    
    team_matches = team_matches.head(lookback)
    
    total_points = 0
    for _, row in team_matches.iterrows():
        if row['HomeTeam'] == team:
            if row['Result'] == 'H':
                total_points += 3
            elif row['Result'] == 'D':
                total_points += 1
        else:
            if row['Result'] == 'A':
                total_points += 3
            elif row['Result'] == 'D':
                total_points += 1
    
    return total_points / (len(team_matches) * 3)  # Normalize to 0-1

def calculate_h2h(df, home_team, away_team, date, seasons, lookback=10):
    """Calculate head-to-head record between two teams"""
    h2h_matches = df[(((df['HomeTeam'] == home_team) & (df['AwayTeam'] == away_team)) |
                     ((df['HomeTeam'] == away_team) & (df['AwayTeam'] == home_team))) &
                    (df['Date'] < date) & 
                    (df['Season'].isin(seasons))].sort_values('Date', ascending=False)
    
    if len(h2h_matches) == 0:
        return 0.5  # Neutral if no history
    
    h2h_matches = h2h_matches.head(lookback)
    
    home_wins = 0
    away_wins = 0
    draws = 0
    
    for _, row in h2h_matches.iterrows():
        if row['Result'] == 'H':
            if row['HomeTeam'] == home_team:
                home_wins += 1
            else:
                away_wins += 1
        elif row['Result'] == 'A':
            if row['HomeTeam'] == home_team:
                away_wins += 1
            else:
                home_wins += 1
        else:
            draws += 1
    
    return home_wins / (home_wins + away_wins + draws)  # Home team's win ratio

def engineer_features(df):
    """Create advanced features for the model"""
    # Make copy to avoid SettingWithCopyWarning
    df = df.copy()
    
    # Convert date to datetime
    df['Date'] = pd.to_datetime(df['Date'])
    
    # Sort by date for form calculations
    df = df.sort_values('Date')
    
    # Create target variable (1 if home win, 0 otherwise)
    df['HomeWin'] = (df['Result'] == 'H').astype(int)
    
    # Initialize new features
    df['HomeForm'] = 0.0
    df['AwayForm'] = 0.0
    df['H2H'] = 0.0
    df['DaysSinceLastHome'] = 0
    df['DaysSinceLastAway'] = 0
    
    # Calculate rolling features for each match
    for i, row in df.iterrows():
        current_date = row['Date']
        season = row['Season']
        home_team = row['HomeTeam']
        away_team = row['AwayTeam']
        
        # Calculate team form
        df.at[i, 'HomeForm'] = calculate_team_form(df, home_team, current_date, [season])
        df.at[i, 'AwayForm'] = calculate_team_form(df, away_team, current_date, [season])
        
        # Calculate head-to-head
        df.at[i, 'H2H'] = calculate_h2h(df, home_team, away_team, current_date, [season])
        
        # Calculate days since last match
        home_prev = df[((df['HomeTeam'] == home_team) | (df['AwayTeam'] == home_team)) & 
                       (df['Date'] < current_date)].sort_values('Date', ascending=False)
        away_prev = df[((df['HomeTeam'] == away_team) | (df['AwayTeam'] == away_team)) & 
                       (df['Date'] < current_date)].sort_values('Date', ascending=False)
        
        if len(home_prev) > 0:
            df.at[i, 'DaysSinceLastHome'] = (current_date - home_prev.iloc[0]['Date']).days
        if len(away_prev) > 0:
            df.at[i, 'DaysSinceLastAway'] = (current_date - away_prev.iloc[0]['Date']).days
    
    # Create additional features
    df['GoalDiff'] = df['HomeGoals'] - df['AwayGoals']
    df['ShotDiff'] = df['HomeShots'] - df['AwayShots']
    df['PossessionDiff'] = df['HomePossession'] - df['AwayPossession']
    df['CornersDiff'] = df['HomeCorners'] - df['AwayCorners']
    df['FoulsDiff'] = df['HomeFouls'] - df['AwayFouls']
    df['CardsDiff'] = (df['HomeYellowCards'] + df['HomeRedCards'] * 2) - \
                      (df['AwayYellowCards'] + df['AwayRedCards'] * 2)
    
    # Select features for modeling
    features = [
        'HomeForm', 'AwayForm', 'H2H', 
        'DaysSinceLastHome', 'DaysSinceLastAway',
        'ShotDiff', 'PossessionDiff', 'CornersDiff',
        'FoulsDiff', 'CardsDiff'
    ]
    
    # Encode team names (optional - can be commented out if not using team features)
    le = LabelEncoder()
    all_teams = pd.concat([df['HomeTeam'], df['AwayTeam']]).unique()
    le.fit(all_teams)
    df['HomeTeam_encoded'] = le.transform(df['HomeTeam'])
    df['AwayTeam_encoded'] = le.transform(df['AwayTeam'])
    features.extend(['HomeTeam_encoded', 'AwayTeam_encoded'])
    
    # Target variable
    target = 'HomeWin'
    
    return df, features, target, le

print("Engineering features...")
data, features, target, team_encoder = engineer_features(data)

###########################
## 3. Data Preparation
###########################

# Split into train and test sets by time (last 20% of matches)
split_idx = int(len(data) * 0.8)
train = data.iloc[:split_idx]
test = data.iloc[split_idx:]

X_train = train[features]
y_train = train[target]
X_test = test[features]
y_test = test[target]

# Scale numerical features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Convert to DMatrix format for XGBoost
dtrain = xgb.DMatrix(X_train_scaled, label=y_train)
dtest = xgb.DMatrix(X_test_scaled, label=y_test)

###########################
## 4. Model Training
###########################

# Set XGBoost parameters
params = {
    'objective': 'binary:logistic',
    'eval_metric': ['logloss', 'error'],
    'eta': 0.1,
    'max_depth': 6,
    'subsample': 0.8,
    'colsample_bytree': 0.8,
    'gamma': 1,
    'min_child_weight': 3,
    'seed': 42
}

# Train with early stopping
num_rounds = 500
eval_list = [(dtrain, 'train'), (dtest, 'eval')]

print("\nTraining XGBoost model...")
model = xgb.train(
    params, 
    dtrain, 
    num_rounds, 
    eval_list,
    early_stopping_rounds=20,
    verbose_eval=10
)

###########################
## 5. Model Evaluation
###########################

def evaluate_model(model, X_test, y_test):
    """Evaluate model performance"""
    # Make predictions
    y_pred_proba = model.predict(xgb.DMatrix(X_test))
    y_pred = (y_pred_proba > 0.5).astype(int)
    
    # Calculate metrics
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)
    
    # Plot confusion matrix
    plt.figure(figsize=(6, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=['AwayWin/Draw', 'HomeWin'], 
                yticklabels=['AwayWin/Draw', 'HomeWin'])
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.title('Confusion Matrix')
    plt.show()
    
    # Print metrics
    print(f"\nModel Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(report)
    
    # Plot feature importance
    plt.figure(figsize=(10, 6))
    xgb.plot_importance(model, max_num_features=15)
    plt.title('Feature Importance')
    plt.show()
    
    return accuracy

print("\nEvaluating model on test set...")
test_accuracy = evaluate_model(model, X_test_scaled, y_test)

###########################
## 6. Prediction Functions
###########################

def predict_match_outcome(home_team, away_team, model, team_encoder, scaler, 
                         home_stats=None, away_stats=None):
    """
    Predict the outcome of a match between two teams.
    
    Args:
        home_team (str): Name of home team
        away_team (str): Name of away team
        model: Trained XGBoost model
        team_encoder: Fitted LabelEncoder for team names
        scaler: Fitted StandardScaler
        home_stats (dict): Optional dictionary of home team stats
        away_stats (dict): Optional dictionary of away team stats
        
    Returns:
        dict: Prediction results with probabilities
    """
    # Default stats if not provided
    if home_stats is None:
        home_stats = {
            'form': 0.5,
            'days_rest': 7,
            'shots': 15,
            'possession': 50,
            'corners': 5,
            'fouls': 12,
            'cards': 1
        }
    
    if away_stats is None:
        away_stats = {
            'form': 0.5,
            'days_rest': 7,
            'shots': 12,
            'possession': 50,
            'corners': 4,
            'fouls': 14,
            'cards': 2
        }
    
    # Encode team names
    try:
        home_encoded = team_encoder.transform([home_team])[0]
        away_encoded = team_encoder.transform([away_team])[0]
    except ValueError as e:
        print(f"Error: {e}. Using average team encoding.")
        home_encoded = len(team_encoder.classes_) // 2
        away_encoded = len(team_encoder.classes_) // 2
    
    # Calculate differences
    shot_diff = home_stats['shots'] - away_stats['shots']
    poss_diff = home_stats['possession'] - away_stats['possession']
    corners_diff = home_stats['corners'] - away_stats['corners']
    fouls_diff = home_stats['fouls'] - away_stats['fouls']
    cards_diff = home_stats['cards'] - away_stats['cards']
    
    # Create feature vector
    features = [
        home_stats['form'], away_stats['form'], 0.5,  # Default H2H if unknown
        home_stats['days_rest'], away_stats['days_rest'],
        shot_diff, poss_diff, corners_diff,
        fouls_diff, cards_diff,
        home_encoded, away_encoded
    ]
    
    # Scale features
    features_scaled = scaler.transform([features])
    
    # Make prediction
    dnew = xgb.DMatrix(features_scaled)
    home_win_prob = model.predict(dnew)[0]
    
    # Determine predicted outcome
    if home_win_prob > 0.6:
        outcome = "Strong Home Win"
    elif home_win_prob > 0.525:
        outcome = "Home Win"
    elif home_win_prob > 0.475:
        outcome = "Draw"
    elif home_win_prob > 0.4:
        outcome = "Away Win"
    else:
        outcome = "Strong Away Win"
    
    return {
        'home_team': home_team,
        'away_team': away_team,
        'home_win_probability': home_win_prob,
        'away_win_probability': 1 - home_win_prob,
        'predicted_outcome': outcome,
        'confidence': abs(home_win_prob - 0.5) * 2  # 0-1 scale where 1 is most confident
    }

# Example prediction
print("\nMaking sample prediction...")
sample_pred = predict_match_outcome(
    home_team="Team_1",
    away_team="Team_2",
    model=model,
    team_encoder=team_encoder,
    scaler=scaler,
    home_stats={'form': 0.7, 'days_rest': 7, 'shots': 18, 'possession': 55, 'corners': 6, 'fouls': 10, 'cards': 1},
    away_stats={'form': 0.4, 'days_rest': 4, 'shots': 10, 'possession': 45, 'corners': 3, 'fouls': 15, 'cards': 2}
)

print("\nSample Prediction Result:")
for key, value in sample_pred.items():
    if isinstance(value, float):
        print(f"{key:25}: {value:.3f}")
    else:
        print(f"{key:25}: {value}")

###########################
## 7. Model Saving
###########################

import joblib

# Save all necessary components
def save_model_artifacts(model, team_encoder, scaler, features, file_prefix):
    """Save all model artifacts to files"""
    model.save_model(f"{file_prefix}_model.json")
    joblib.dump(team_encoder, f"{file_prefix}_encoder.pkl")
    joblib.dump(scaler, f"{file_prefix}_scaler.pkl")
    joblib.dump(features, f"{file_prefix}_features.pkl")
    print(f"Model artifacts saved with prefix '{file_prefix}_'")

# Save model
save_model_artifacts(model, team_encoder, scaler, features, "xgboost_football")

# Load model function (for completeness)
def load_model_artifacts(file_prefix):
    """Load all model artifacts from files"""
    model = xgb.Booster()
    model.load_model(f"{file_prefix}_model.json")
    team_encoder = joblib.load(f"{file_prefix}_encoder.pkl")
    scaler = joblib.load(f"{file_prefix}_scaler.pkl")
    features = joblib.load(f"{file_prefix}_features.pkl")
    return model, team_encoder, scaler, features

print("\nFull XGBoost football prediction pipeline complete!")