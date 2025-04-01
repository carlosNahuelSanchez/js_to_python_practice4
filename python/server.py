from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def sumar_matrices(matriz1, matriz2):
    """Suma dos matrices de igual tamaño."""
    filas = len(matriz1)
    columnas = len(matriz1[0])

    matriz_resultante = [[matriz1[i][j] + matriz2[i][j] for j in range(columnas)] for i in range(filas)]
    return matriz_resultante

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/sumar', methods=['POST'])
def sumar():
    try:
        data = request.json
        matriz1 = data['matriz1']
        matriz2 = data['matriz2']

        resultado = sumar_matrices(matriz1, matriz2)
        return jsonify({"matrizResultado": resultado})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4500, debug=True)
