import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-6">
        🚀 Zangur Frontend Configurado
      </h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ✅ Tailwind CSS instalado correctamente
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-700 mb-2">Archivos creados:</h3>
            <ul className="list-disc pl-5 text-green-600">
              <li>tailwind.config.js</li>
              <li>postcss.config.js</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-700 mb-2">Próximos pasos:</h3>
            <ul className="list-disc pl-5 text-blue-600">
              <li>Crear componentes</li>
              <li>Conectar con API</li>
              <li>Diseñar interfaz</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-bold text-yellow-700 mb-2">💡 Prueba Tailwind:</h3>
          <button className="mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-200 shadow-md">
            Botón con Tailwind
          </button>
          <p className="mt-3 text-gray-600 text-sm">
            Este botón usa clases de Tailwind: gradiente, hover effects, shadows, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
