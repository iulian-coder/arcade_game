from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home_page():
    error = None
    return render_template('snake.html', error=error)

if __name__=='__main__':
    app.run(debug=True, host='0.0.0.0')
