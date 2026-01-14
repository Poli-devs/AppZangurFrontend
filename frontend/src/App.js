@'
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🚀 Tailwind CSS
          </h1>
          <p className="text-gray-600 mt-2">Configurado correctamente</p>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="font-bold text-green-700 mb-2">✅ Instalación verificada</h2>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• Tailwind CSS v3 funcionando</li>
              <li>• PostCSS y autoprefixer configurados</li>
              <li>• Estructura hexagonal lista</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="btn-primary">
              Botón Primario
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
              Secundario
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-700 mb-2">Prueba Tailwind:</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Email" 
                className="input-field"
              />
              <input 
                type="password" 
                placeholder="Contraseña" 
                className="input-field"
              />
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
'@ | Out-File -FilePath src\App.js -Encoding UTF8