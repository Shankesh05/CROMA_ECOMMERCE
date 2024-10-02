from flask import Flask, render_template
import pandas as pd
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend for web apps
import matplotlib.pyplot as plt
import seaborn as sns
import os

app = Flask(__name__)

# Set the path to your CSV file
FILE_PATH = r'C:\Users\Shankesh Raja\Documents\analysis\user_attribures.csv'

@app.route('/')
def dashboard():
    try:
        # Load the dataset
        df = pd.read_csv(FILE_PATH)

        # Create the plots and save them as images
        plots = {
            'gender_distribution': 'gender_distribution.png',
            'age_distribution': 'age_distribution.png',
            'total_spent_distribution': 'total_spent_distribution.png',
        }

        # Generate plots
        for plot_name, filename in plots.items():
            plt.figure(figsize=(10, 6))
            if plot_name == 'gender_distribution':
                sns.countplot(data=df, x='gender')
            elif plot_name == 'age_distribution':
                sns.histplot(data=df, x='age', bins=30, kde=True)
            elif plot_name == 'total_spent_distribution':
                sns.histplot(data=df, x='total_spent', bins=30, kde=True)
            plt.title(plot_name.replace('_', ' ').title())
            plt.savefig(os.path.join('static', filename))  # Save plots in static folder
            plt.close()

        # Render the dashboard template
        return render_template('dashboard.html', plots=plots)

    except Exception as e:
        return f"An error occurred: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
