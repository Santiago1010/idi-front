<template>
  <q-dialog v-model="newInvestigationDialog">
    <q-card style="min-width: 80%;">
        <q-tabs v-model="stateNewProject" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
          <q-tab name="questions" label="Preguntas" />
          <q-tab name="preview" label="Previsualización" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="stateNewProject" animated>
          <q-tab-panel name="questions">
            <q-input outlined v-model="projectsData.what" class="q-my-md" label="¿Qué quiero investigar? *" hint="Esta pregunta busca definir claramente el tema o área de interés que se desea investigar." :rules="[rulesStore.required]">
              <q-tooltip>Es fundamental establecer un objetivo de investigación específico y bien delimitado para orientar todo el proceso investigativo.</q-tooltip>
            </q-input>

            <q-input outlined v-model="projectsData.why" class="q-my-md" label="¿Por qué es importante esta investigación? *" hint="Aquí se analiza la relevancia y justificación del proyecto de investigación." :rules="[rulesStore.required]">
              <q-tooltip>Es fundamental entender qué aportes o beneficios puede brindar el estudio y porqué vale la pena abordar este tema en particular.</q-tooltip>
            </q-input>

            <q-input outlined v-model="projectsData.who" class="q-my-md" label="¿Qué grupo de personas participarán en el estudio? *" hint="Esta pregunta se centra en los sujetos o grupos involucrados en el proyecto de investigación." :rules="[rulesStore.required]">
              <q-tooltip>Identificar a los participantes clave y las partes interesadas es fundamental para comprender cómo se llevará a cabo el estudio y cómo se aplicarán los resultados.</q-tooltip>
            </q-input>

            <q-input outlined v-model="projectsData.when" class="q-my-md" label="¿En qué tiempos se planea realizar el estudio? *" hint="Esta pregunta busca el marco temporal del proyecto y los plazos para llevarlo a cabo." :rules="[rulesStore.required]">
              <q-tooltip>Establecer un cronograma claro es esencial para la planificación y ejecución exitosa del estudio.</q-tooltip>
            </q-input>

            <q-input outlined v-model="projectsData.where" class="q-my-md" label="¿Dónde se llevará a cabo el estudio? *" hint="Esta pregunta se enfoca en los lugares donde se llevará a cabo la investigación." :rules="[rulesStore.required]">
              <q-tooltip>Identificar las ubicaciones geográficas y los entornos clínicos o experimentales es importante para comprender la escala y alcance del estudio.</q-tooltip>
            </q-input>

            <q-input outlined v-model="projectsData.how" class="q-my-md" label="¿Cómo se realizará? *" hint="Esta pregunta se refiere a los métodos y enfoques que se utilizarán para llevar a cabo el proyecto." :rules="[rulesStore.required]">
              <q-tooltip>Describir cómo se recolectarán y analizarán los datos, así como los procedimientos técnicos, es esencial para comprender la metodología del estudio.</q-tooltip>
            </q-input>
          </q-tab-panel>

          <q-tab-panel name="preview">
            <h4><span class="text-bold">Título del proyecto:</span> {{ projectsData.what }}</h4>
            <h4><span class="text-bold">Justificación:</span> {{ projectsData.why }}</h4>
            <h4><span class="text-bold">Grupo de estudio:</span> {{ projectsData.who }}</h4>
            <h4><span class="text-bold">Tiempo de ejecución:</span> {{ projectsData.when }}</h4>
            <h4><span class="text-bold">Métodos:</span> {{ projectsData.how }}</h4>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  </q-dialog>
</template>

<script setup>
  // Importar internos de vue
  import { ref } from 'vue'

  // Importar tiendas
  import { useRulesStore } from '../stores/RulesStore.js'

  // Constantes y variables
  const rulesStore = useRulesStore()

  const newInvestigationDialog = ref(true)
  const stateNewProject = ref('questions')

  const projectsData = ref({
    what: null,
    why: null,
    who: null,
    when: null,
    how: null,
  })
</script>
