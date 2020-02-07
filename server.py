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

@app.route('/mars-wars')
def mars_wars():
    return render_template('mars-wars.html')

@app.route('/us')
def us():
    return render_template(('mars_wars_untold_stories.html'))

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
