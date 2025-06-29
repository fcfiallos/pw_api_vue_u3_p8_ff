<template>
  <div class="container">
    <div class="search-section">
      <h1>Consultar Estudiante</h1>
      <input
        type="text"
        v-model="idEstudiante"
        placeholder="Ingrese el ID del estudiante"
      />
      <button @click="consultarEstudiante">Consultar</button>
    </div>
    
    <div v-if="mostrarFormulario" class="form-section">
      <label for="id_nombre">Nombre</label>
      <input type="text" id="id_nombre" v-model="nombre" />
      
      <label for="id_apellido">Apellido</label>
      <input type="text" id="id_apellido" v-model="apellido" />
      
      <label for="id_fecha_nacimiento">Fecha de Nacimiento</label>
      <input type="date" id="id_fecha_nacimiento" v-model="fechaNacimiento" />
    </div>
    
    <div v-if="error" class="error-message">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script>
import { obtenerEstudiantePorIdFachada } from "@/clients/EstudianteClient";
export default {
  data() {
    return {
      idEstudiante: null,
      estudiante: null,
      error: null,
      nombre: null,
      apellido: null,
      fechaNacimiento: null,
      mostrarFormulario: false,
    };
  },
  methods: {
    async consultarEstudiante() {
      try {
        this.estudiante = await obtenerEstudiantePorIdFachada(
          this.idEstudiante
        );
        console.log(this.estudiante);
        this.nombre = this.estudiante.nombre;
        this.apellido = this.estudiante.apellido;
        this.fechaNacimiento = this.formatearFechaParaInput(
          this.estudiante.fechaNacimiento
        );
        this.mostrarFormulario = true;
      } catch (error) {
        this.error = "Error al consultar el estudiante: " + error.message;
        this.limpiarCampos();
      }
    },
    formatearFechaParaInput(fecha) {
      if (!fecha) return "";

      if (fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return fecha;
      }

      const fechaObj = new Date(fecha);
      if (isNaN(fechaObj.getTime())) {
        console.error("Formato de fecha inválido:", fecha);
        return "";
      }

      return fechaObj.toISOString().split("T")[0];
    },
    limpiarCampos() {
      this.nombre = null;
      this.apellido = null;
      this.fechaNacimiento = null;
    },
  },
  /*mounted() {
    if (this.$route.params.id) {
      this.idEstudiante = this.$route.params.id;
      this.consultarEstudiante();
    } else {
      this.limpiarCampos();
    }
  },*/
};
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f4ff 0%, #f0ebff 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(124, 58, 237, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #6b46c1;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(124, 58, 237, 0.1);
}

.search-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.1);
  margin-bottom: 1.5rem;
}

.form-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(124, 58, 237, 0.1);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  background-color: #faf9ff;
}

input:hover {
  border-color: #a78bfa;
}

input[type="date"] {
  color: #6b46c1;
}

button {
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

button:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
}

label {
  display: block;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #6b46c1;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  text-align: left;
}

label:first-child {
  margin-top: 0;
}

.error-message {
  background: linear-gradient(135deg, #fef2f2 0%, #fde8e8 100%);
  border: 1px solid #fca5a5;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  animation: slideIn 0.3s ease-out;
}

.error-message span {
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    margin: 1rem;
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .search-section,
  .form-section {
    padding: 1rem;
  }
}
</style>