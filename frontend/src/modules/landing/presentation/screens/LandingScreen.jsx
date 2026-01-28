import React from 'react';
import { Link } from 'react-router-dom';

const LandingScreen = () => {
  return (
    <div className="min-h-screen bg-bg-app"> {/* REGLA 4: Fondo general */}
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center"> {/* REGLA 3: Logo */}
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-2xl font-bold text-corporate-DEFAULT">ZANGUR</span> {/* REGLA 1: Títulos */}
            </div>

            {/* Menú de navegación */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-700 hover:text-action-green font-medium"> {/* REGLA 2: Hover verde */}
                Inicio
              </a>
              <a href="#productos" className="text-gray-700 hover:text-action-green font-medium">
                Productos
              </a>
              <a href="#beneficios" className="text-gray-700 hover:text-action-green font-medium">
                Beneficios
              </a>
              <a href="#testimonios" className="text-gray-700 hover:text-action-green font-medium">
                Testimonios
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-action-green font-medium">
                Contacto
              </a>
            </nav>

            {/* Botón Login - REGLA 2: Botones principales en verde */}
            <Link 
              to="/login"
              className="bg-action-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-action-hover transition shadow-md"
            >
              Acceder al Sistema
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="inicio" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto hero */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-corporate-DEFAULT mb-6 leading-tight">
                Potencia tu <span className="text-action-green">crecimiento</span> con nuestro sistema
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Una plataforma integral para gestión de redes de referidos con estructura binaria. Maximiza tus ganancias de manera organizada y profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* REGLA 2: Botón principal verde */}
                <Link 
                  to="/login"
                  className="bg-action-green text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-action-hover transition shadow-lg text-center"
                >
                  Comenzar Ahora
                </Link>
                <a 
                  href="#beneficios"
                  className="bg-bg-card text-corporate-DEFAULT px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-300 hover:border-action-green transition shadow text-center"
                >
                  Conocer Más
                </a>
              </div>
            </div>

            {/* Imagen/Ilustración hero */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* Nodo central */}
                  <div className="col-span-2 flex justify-center mb-6">
                    <div className="w-24 h-24 bg-action-green rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white text-2xl font-bold">Tú</span>
                    </div>
                  </div>
                  {/* Nodos secundarios */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-action-green/20 rounded-full flex items-center justify-center border-4 border-white shadow">
                      <span className="text-action-green font-bold">A</span>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-action-green/20 rounded-full flex items-center justify-center border-4 border-white shadow">
                      <span className="text-action-green font-bold">B</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-corporate-DEFAULT font-medium">Estructura Binaria Balanceada</p>
                  <p className="text-gray-500 text-sm mt-2">Crecimiento organizado y escalable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section id="beneficios" className="py-20 bg-bg-app"> {/* REGLA 4 */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate-DEFAULT mb-4">¿Por qué elegir ZANGUR?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Una plataforma diseñada para maximizar tu potencial con herramientas profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beneficio 1 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-action-green/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-corporate-DEFAULT mb-4">Dashboard Intuitivo</h3>
              <p className="text-gray-600">
                Controla toda tu red desde un panel simple pero poderoso. Visualiza tu crecimiento en tiempo real.
              </p>
            </div>

            {/* Beneficio 2 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-action-green/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-corporate-DEFAULT mb-4">Seguridad Total</h3>
              <p className="text-gray-600">
                Tus datos y transacciones protegidos con encriptación de grado bancario. Tu tranquilidad es nuestra prioridad.
              </p>
            </div>

            {/* Beneficio 3 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-action-green/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-corporate-DEFAULT mb-4">Crecimiento Exponencial</h3>
              <p className="text-gray-600">
                Sistema de referidos binario probado que maximiza tu potencial de ingresos de manera organizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTOS ===== */}
      <section id="productos" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate-DEFAULT mb-4">Nuestros Productos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accede a productos exclusivos diseñados para tu éxito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Producto 1 */}
            <div className="bg-bg-card border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-corporate-DEFAULT">Kit Inicial</h3>
                  <p className="text-gray-600">Perfecto para comenzar</p>
                </div>
                <span className="text-3xl">🎯</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-corporate-DEFAULT">$25</span>
                <span className="text-gray-500"> / único</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Acceso al sistema por 1 año</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Soporte básico incluido</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Dashboard personal</span>
                </li>
              </ul>
              {/* REGLA 2: Botón verde */}
              <button className="w-full bg-action-green text-white py-3 rounded-lg font-semibold hover:bg-action-hover transition">
                Comprar Ahora
              </button>
            </div>

            {/* Producto 2 */}
            <div className="bg-bg-card border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-corporate-DEFAULT">Kit Premium</h3>
                  <p className="text-gray-600">Para crecimiento acelerado</p>
                </div>
                <span className="text-3xl">⭐</span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-corporate-DEFAULT">$50</span>
                <span className="text-gray-500"> / único</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Todos los beneficios del Kit Inicial</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Soporte prioritario 24/7</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Acceso a eventos exclusivos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-6 h-6 bg-action-green/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-action-green">✓</span>
                  </div>
                  <span>Bonificaciones especiales</span>
                </li>
              </ul>
              {/* REGLA 2: Botón verde */}
              <button className="w-full bg-action-green text-white py-3 rounded-lg font-semibold hover:bg-action-hover transition">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section id="testimonios" className="py-20 bg-bg-app">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-corporate-DEFAULT mb-4">Lo que dicen nuestros usuarios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de personas ya están creciendo con nuestro sistema
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-action-green/20 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-corporate-DEFAULT">Carlos Mendoza</h4>
                  <p className="text-gray-500 text-sm">Afiliado desde 2024</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "El sistema me ha permitido organizar mi red de manera profesional. La plataforma es intuitiva y los resultados han sido increíbles."
              </p>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-action-green/20 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-corporate-DEFAULT">Ana Rodríguez</h4>
                  <p className="text-gray-500 text-sm">Operadora</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Como operadora, la herramienta me ha facilitado enormemente el trabajo. Puedo gestionar toda mi red desde un solo lugar."
              </p>
            </div>

            {/* Testimonio 3 */}
            <div className="bg-bg-card p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-action-green/20 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-corporate-DEFAULT">Roberto Sánchez</h4>
                  <p className="text-gray-500 text-sm">Administrador</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "La mejor inversión que he hecho. El retorno ha superado todas mis expectativas. El equipo de soporte es excelente."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-corporate-light rounded-3xl p-12 text-center text-white shadow-2xl"> {/* REGLA 1: Fondo corporate */}
            <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Únete a miles de personas que ya están transformando su crecimiento con nuestra plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {/* REGLA 2: Botón principal verde */}
              <Link 
                to="/login"
                className="bg-action-green text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-action-hover transition shadow-lg"
              >
                Comenzar Gratis
              </Link>
              <a 
                href="#contacto"
                className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
              >
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contacto" className="bg-corporate-DEFAULT text-white py-12"> {/* REGLA 1: Footer corporate */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna 1: Logo y descripción */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center"> {/* REGLA 3: Logo rojo */}
                  <span className="font-bold text-xl">Z</span>
                </div>
                <span className="text-2xl font-bold">ZANGUR</span>
              </div>
              <p className="text-gray-400">
                Plataforma profesional para gestión de redes de referidos con estructura binaria.
              </p>
            </div>

            {/* Columna 2: Enlaces */}
            <div>
              <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#inicio" className="text-gray-400 hover:text-white">Inicio</a></li>
                <li><a href="#productos" className="text-gray-400 hover:text-white">Productos</a></li>
                <li><a href="#beneficios" className="text-gray-400 hover:text-white">Beneficios</a></li>
                <li><a href="#testimonios" className="text-gray-400 hover:text-white">Testimonios</a></li>
              </ul>
            </div>

            {/* Columna 3: Legal */}
            <div>
              <h4 className="text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Términos y Condiciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Aviso Legal</a></li>
              </ul>
            </div>

            {/* Columna 4: Contacto */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contacto</h4>
              <ul className="space-y-3 text-gray-400">
                <li>📧 info@zangur.com</li>
                <li>📞 +593 99 999 9999</li>
                <li>📍 Quito, Ecuador</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} ZANGUR. Todos los derechos reservados.</p>
            <p className="text-sm mt-2">Sistema de gestión de redes de referidos</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;