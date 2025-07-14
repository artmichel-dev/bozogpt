/**
 * Script de prueba para el sistema de viewport dinámico
 * Este archivo puede ser ejecutado en el navegador para verificar el funcionamiento
 */

export const testViewportSystem = () => {
  console.log('🧪 Iniciando pruebas del sistema de viewport dinámico...');

  // 1. Verificar que las variables CSS están definidas
  const checkCSSVariables = () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const requiredVariables = [
      '--viewport-height',
      '--viewport-width', 
      '--initial-viewport-height',
      '--is-keyboard-open',
      '--scale-factor'
    ];

    const missingVariables = requiredVariables.filter(varName => 
      !computedStyle.getPropertyValue(varName)
    );

    if (missingVariables.length > 0) {
      console.error('❌ Variables CSS faltantes:', missingVariables);
      return false;
    }

    console.log('✅ Variables CSS definidas correctamente');
    return true;
  };

  // 2. Verificar que el Visual Viewport API está disponible
  const checkVisualViewportAPI = () => {
    if (window.visualViewport) {
      console.log('✅ Visual Viewport API disponible');
      console.log('   - Altura actual:', window.visualViewport.height);
      console.log('   - Ancho actual:', window.visualViewport.width);
      console.log('   - Escala actual:', window.visualViewport.scale);
      return true;
    } else {
      console.warn('⚠️ Visual Viewport API no disponible, usando fallback');
      return false;
    }
  };

  // 3. Verificar que las clases CSS están aplicadas
  const checkCSSClasses = () => {
    const body = document.body;
    const html = document.documentElement;
    
    const requiredClasses = ['viewport-dynamic'];
    const missingClasses = requiredClasses.filter(className => 
      !body.classList.contains(className)
    );

    if (missingClasses.length > 0) {
      console.error('❌ Clases CSS faltantes en body:', missingClasses);
      return false;
    }

    console.log('✅ Clases CSS aplicadas correctamente');
    return true;
  };

  // 4. Verificar que el body tiene la altura correcta
  const checkBodyHeight = () => {
    const body = document.body;
    const computedStyle = getComputedStyle(body);
    const height = computedStyle.height;
    const minHeight = computedStyle.minHeight;

    console.log('📏 Altura del body:', height);
    console.log('📏 Min-height del body:', minHeight);

    if (height === '0px' || minHeight === '0px') {
      console.error('❌ Body no tiene altura definida');
      return false;
    }

    console.log('✅ Altura del body configurada correctamente');
    return true;
  };

  // 5. Simular cambio de viewport (solo para testing)
  const simulateViewportChange = () => {
    console.log('🔄 Simulando cambio de viewport...');
    
    // Simular reducción del viewport (como si apareciera el teclado)
    const originalHeight = window.innerHeight;
    const reducedHeight = originalHeight * 0.6;
    
    // Actualizar variables CSS manualmente para la prueba
    document.documentElement.style.setProperty('--viewport-height', `${reducedHeight}px`);
    document.documentElement.style.setProperty('--is-keyboard-open', '1');
    document.body.classList.add('viewport-reduced');
    document.documentElement.classList.add('viewport-reduced');
    
    console.log(`   - Altura original: ${originalHeight}px`);
    console.log(`   - Altura reducida: ${reducedHeight}px`);
    console.log(`   - Teclado simulado: abierto`);
    
    // Restaurar después de 2 segundos
    setTimeout(() => {
      document.documentElement.style.setProperty('--viewport-height', `${originalHeight}px`);
      document.documentElement.style.setProperty('--is-keyboard-open', '0');
      document.body.classList.remove('viewport-reduced');
      document.documentElement.classList.remove('viewport-reduced');
      console.log('✅ Viewport restaurado');
    }, 2000);
  };

  // 6. Verificar performance
  const checkPerformance = () => {
    const start = performance.now();
    
    // Simular múltiples cambios de viewport
    for (let i = 0; i < 10; i++) {
      document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight - i * 10}px`);
    }
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`⚡ Performance: ${duration.toFixed(2)}ms para 10 cambios`);
    
    if (duration > 100) {
      console.warn('⚠️ Performance podría mejorarse');
      return false;
    }
    
    console.log('✅ Performance aceptable');
    return true;
  };

  // Ejecutar todas las pruebas
  const results = {
    cssVariables: checkCSSVariables(),
    visualViewportAPI: checkVisualViewportAPI(),
    cssClasses: checkCSSClasses(),
    bodyHeight: checkBodyHeight(),
    performance: checkPerformance()
  };

  // Resumen de resultados
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;

  console.log(`\n📊 Resumen de pruebas: ${passedTests}/${totalTests} pasaron`);
  
  if (passedTests === totalTests) {
    console.log('🎉 ¡Sistema de viewport dinámico funcionando correctamente!');
  } else {
    console.log('⚠️ Algunas pruebas fallaron, revisar configuración');
  }

  // Opcional: simular cambio de viewport
  if (confirm('¿Deseas simular un cambio de viewport para ver el efecto?')) {
    simulateViewportChange();
  }

  return results;
};

// Función para verificar el estado actual del viewport
export const getViewportStatus = () => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  return {
    viewportHeight: computedStyle.getPropertyValue('--viewport-height'),
    viewportWidth: computedStyle.getPropertyValue('--viewport-width'),
    isKeyboardOpen: computedStyle.getPropertyValue('--is-keyboard-open'),
    scaleFactor: computedStyle.getPropertyValue('--scale-factor'),
    bodyHeight: getComputedStyle(document.body).height,
    visualViewportAvailable: !!window.visualViewport,
    visualViewportHeight: window.visualViewport?.height || 'N/A',
    windowInnerHeight: window.innerHeight
  };
};

// Función para monitorear cambios en tiempo real
export const startViewportMonitoring = () => {
  console.log('🔍 Iniciando monitoreo del viewport...');
  
  let lastStatus = getViewportStatus();
  
  const monitor = setInterval(() => {
    const currentStatus = getViewportStatus();
    
    // Detectar cambios
    const hasChanged = Object.keys(currentStatus).some(key => 
      currentStatus[key as keyof typeof currentStatus] !== lastStatus[key as keyof typeof lastStatus]
    );
    
    if (hasChanged) {
      console.log('🔄 Cambio detectado en viewport:', currentStatus);
      lastStatus = currentStatus;
    }
  }, 1000);
  
  // Retornar función para detener el monitoreo
  return () => {
    clearInterval(monitor);
    console.log('🛑 Monitoreo detenido');
  };
};

// Auto-ejecutar en desarrollo
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Exponer funciones globalmente para debugging
  (window as any).testViewportSystem = testViewportSystem;
  (window as any).getViewportStatus = getViewportStatus;
  (window as any).startViewportMonitoring = startViewportMonitoring;
  
  console.log('🔧 Funciones de prueba disponibles:');
  console.log('   - testViewportSystem()');
  console.log('   - getViewportStatus()');
  console.log('   - startViewportMonitoring()');
} 