<template>
  <div class="container">
    <div class="header">
      <h1>Listado de Estudiantes</h1>
      <div>
        <button @click="consultarEstudiantes" class="btn">
          Consultar
        </button>
      </div>
    </div>
    <div v-if="mostrarTabla" class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(estudiante, index) in estudiantes"
            :key="index"
          >
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.apellido }}</td>
            <td class="date">{{ estudiante.fechaNacimiento }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="error" class="error">
      <span>{{ error }}</span>
    </div>
  </div>
</template>

<script>
import { obtenerEstudiantesFachada } from "@/clients/EstudianteClient";

export default {
  data() {
    return {
      estudiantes: null,
      error: null,
      mostrarTabla: false,
    };
  },
  methods: {
    async consultarEstudiantes() {
      try {
        this.estudiantes = await obtenerEstudiantesFachada();
        console.log(this.estudiantes);
        this.mostrarTabla = true;
        this.error = null;
      } catch (error) {
        this.error = "Error al consultar los estudiantes: " + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* ===== CONTENEDOR PRINCIPAL ===== */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

/* ===== HEADER ===== */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  color: white;
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 30px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.header div {
  display: flex;
  justify-content: center;
}

/* ===== BOTÓN ===== */
.btn {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 15px 30px;
  border: none;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  color: #2d3748;
}

/* ===== TABLA ===== */
.table-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.table th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 700;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
}

.table th:first-child {
  border-top-left-radius: 15px;
}

.table th:last-child {
  border-top-right-radius: 15px;
}

.table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid #e2e8f0;
}

.table tbody tr:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  transform: scale(1.01);
}

.table tbody tr:last-child {
  border-bottom: none;
}

.table td {
  padding: 18px 15px;
  font-size: 16px;
  color: #2d3748;
  font-weight: 600;
  border: none;
}

.table td.date {
  color: #4a5568;
  font-weight: 500;
}

/* ===== ERROR ===== */
.error {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  padding: 20px;
  margin-top: 20px;
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .header h1 {
    font-size: 28px;
  }

  .header div {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 250px;
  }

  .table-container {
    padding: 15px;
  }

  .table {
    min-width: 600px;
  }

  .table th,
  .table td {
    padding: 12px 8px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .table-container {
    padding: 10px;
  }

  .table th,
  .table td {
    padding: 8px 6px;
    font-size: 12px;
  }
}
</style>