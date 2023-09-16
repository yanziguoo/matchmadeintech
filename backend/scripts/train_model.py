import pandas as pd
    
file_path = "data/training_data.csv"
data = pd.read_csv(file_path)

print(data.head())

y = data.Price
data_features = ['Rooms', 'Bathroom', 'Landsize', 'BuildingArea', 'YearBuilt', 'Lattitude', 'Longtitude']
# X = data[data_features]
