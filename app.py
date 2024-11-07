from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# API key for OpenWeatherMap
API_KEY = "8ed483b4d5e21395f488b76ca206d530"

# Homepage Route
@app.route('/')
def index():
    return render_template('index.html')

# Weather data endpoint
@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')

    if city:
        # Construct the API URL
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
        response = requests.get(url)
        data = response.json()

        # If successful, parse the data
        if response.status_code == 200:
            main = data['main']
            weather = data['weather'][0]
            wind = data['wind']
            weather_data = {
                'city': city,
                'temperature': main['temp'],
                'description': weather['description'],
                'humidity': main['humidity'],
                'wind_speed': wind['speed']
            }
            return jsonify(weather_data)
        else:
            return jsonify({'error': 'City not found or API error.'})
    else:
        return jsonify({'error': 'City parameter is missing'})

if __name__ == '__main__':
    app.run(debug=True)
