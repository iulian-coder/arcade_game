from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home_page():
    error = None
    return render_template('home.html', error=error)


@app.route('/snake', methods=['GET'])
def snake():
    return render_template('snake.html')


@app.route('/cars')
def cars():
    return render_template('car.html')


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1')
