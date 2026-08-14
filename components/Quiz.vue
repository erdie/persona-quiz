<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-sm rounded-xl border border-gray-100" v-if="!submitted">
        <div class="mb-8">
            <!-- Progress Bar -->
            <div class="relative w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
                <div
                class="absolute top-0 left-0 bg-blue-600 h-full transition-all duration-300 ease-out"
                :style="{ width: `${progressPercentage}%` }"
                ></div>
            </div>

            <!-- Current Question -->
            <div v-if="currentQuestion < questions.length">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                    {{ currentQuestion + 1 }}. {{ questions[currentQuestion].text }}
                </h2>
                <div class="space-y-3">
                    <label
                        v-for="(option, optIndex) in questions[currentQuestion].options"
                        :key="optIndex"
                        class="flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200"
                        :class="[
                            answers[currentQuestion] === option 
                                ? 'border-blue-500 bg-blue-50/50 text-blue-700' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                        ]"
                    >
                        <input
                            type="radio"
                            :name="`question-${currentQuestion}`"
                            :value="option"
                            v-model="answers[currentQuestion]"
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span class="ml-3 font-medium">{{ option }}</span>
                    </label>
                </div>

                <!-- Buttons -->
                <div class="flex justify-between mt-8">
                    <button
                        @click="previousQuestion"
                        class="px-5 py-2.5 rounded-lg font-medium transition-colors"
                        :class="currentQuestion === 0 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'"
                        :disabled="currentQuestion === 0"
                    >
                        Previous
                    </button>
                    
                    <button
                        @click="nextOrSubmit"
                        class="px-5 py-2.5 rounded-lg font-medium transition-all"
                        :class="!answers[currentQuestion] ? 'bg-blue-300 text-white cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'"
                        :disabled="!answers[currentQuestion]"
                    >
                        {{ currentQuestion === questions.length - 1 ? 'Submit' : 'Next' }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Result -->
    <div v-else class="max-w-2xl mx-auto mt-8 p-8 bg-white border border-gray-100 shadow-sm rounded-xl text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
        <p class="text-gray-600 text-lg">Your persona is:</p>
        <p class="text-3xl font-extrabold text-blue-600 mt-4">{{ personaType }}</p>
    </div>
</template>

  

<script setup lang="ts">
import { ref } from 'vue'

const questions = ref([
    {
        text: 'Which type of task do you prefer?',
        options: ['A - Practical and hands-on', 'B - Collaborative and teamwork-focused', 'C - Creative and experimental', 'D - Technical and problem-solving'],
    },
    {
        text: 'What motivates you most in a project?',
        options: ['A - Achieving tangible results', 'B - Building connections and relationships', 'C - Innovating and creating new things', 'D - Solving complex problems'],
    },
    {
        text: 'What role do you usually take in a team?',
        options: ['A - The one who gets things done', 'B - The one who keeps the team together', 'C - The one who brings new ideas', 'D - The one who tackles the hardest challenges'],
    },
    {
        text: 'Which approach do you prefer for solving problems?',
        options: ['A - Step-by-step, practical solutions', 'B - Brainstorming with others', 'C - Trying out unconventional methods', 'D - Analyzing and debugging'],
    },
    {
        text: 'What is your strength?',
        options: ['A - Practicality', 'B - Networking', 'C - Creativity', 'D - Technical expertise'],
    },
    {
        text: 'How do you approach new projects?',
        options: ['A - With a clear plan and steps', 'B - By gathering input from others', 'C - By experimenting and iterating', 'D - By diving into technical details'],
    },
    {
        text: 'How do you handle challenges?',
        options: ['A - With a focus on practical solutions', 'B - By seeking help from others', 'C - By thinking outside the box', 'D - By breaking down the problem and analyzing it'],
    },
    {
        text: 'What do you value most in your work?',
        options: ['A - Efficiency and productivity', 'B - Collaboration and teamwork', 'C - Innovation and creativity', 'D - Accuracy and technical precision'],
    },
    {
        text: 'What is your preferred working style?',
        options: ['A - Independently and efficiently', 'B - In a team environment', 'C - Flexibly and creatively', 'D - With a focus on technical details'],
    },
    {
        text: 'How do you prefer to learn new skills?',
        options: ['A - Through hands-on practice', 'B - By learning from others', 'C - By experimenting with new ideas', 'D - By studying and analyzing technical information'],
    },
    {
        text: 'What is your preferred type of project?',
        options: ['A - Projects with clear outcomes', 'B - Projects that require collaboration', 'C - Projects that allow for innovation', 'D - Projects that involve complex problem-solving'],
    },
    {
        text: 'How do you manage your time?',
        options: ['A - With a strict schedule', 'B - By balancing social interactions', 'C - With flexibility to explore ideas', 'D - By prioritizing based on complexity'],
    },
    {
        text: 'What type of feedback do you prefer?',
        options: ['A - Direct and actionable', 'B - Encouraging and supportive', 'C - Constructive with room for creativity', 'D - Detailed and analytical'],
    },
    {
        text: 'How do you contribute to a brainstorming session?',
        options: ['A - By suggesting practical ideas', 'B - By ensuring everyone’s voice is heard', 'C - By introducing innovative concepts', 'D - By analyzing feasibility of ideas'],
    },
    {
        text: 'What is your preferred toolset?',
        options: ['A - Tools that enhance productivity', 'B - Tools that facilitate communication', 'C - Tools that enable creativity', 'D - Tools that provide deep technical insights'],
    }
])

const answers = ref<string[]>(Array(questions.value.length).fill(''))
const submitted = ref(false)
const currentQuestion = ref(0)
const personaType = ref('')

// Progress percentage based on the current question
const progressPercentage = computed(() => {
    return ((currentQuestion.value + 1) / questions.value.length) * 100
})

// Go to the next question or submit the quiz if on the last question
const nextOrSubmit = () => {
    if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++
    } else {
        submitQuiz()
    }
}

// Go to the previous question
const previousQuestion = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value--
    }
}

const submitQuiz = () => {
    submitted.value = true
    determinePersonaType()
}

const determinePersonaType = () => {
    const answerCounts = { A: 0, B: 0, C: 0, D: 0 }
    
    answers.value.forEach(answer => {
        const type = answer.charAt(0) // Get the first character (A, B, C, D)
        if (answerCounts[type] !== undefined) {
            answerCounts[type]++
        }
    })
    
    const maxCount = Math.max(...Object.values(answerCounts))
    const dominantTypes = Object.keys(answerCounts).filter(type => answerCounts[type] === maxCount)
    
    if (dominantTypes.length === 1) {
        personaType.value = getPersonaLabel(dominantTypes[0])
    } else if (dominantTypes.length === 2 && maxCount >= 6) {
        personaType.value = getCombinedPersonaLabel(dominantTypes[0], dominantTypes[1])
    } else if (dominantTypes.length === 3 && maxCount === 5) {
        personaType.value = getTiebreakerPersonaLabel(dominantTypes)
    } else {
        personaType.value = getPersonaLabel(dominantTypes[0]) // Default to the first if more than two are tied or no dominant pair with 6 answers
    }
}

const getPersonaLabel = (type: string) => {
    switch (type) {
        case 'A': return 'The Pragmatic'
        case 'B': return 'The Connector'
        case 'C': return 'The Innovator'
        case 'D': return 'The Hacker'
        default: return ''
    }
}

const getCombinedPersonaLabel = (type1: string, type2: string) => {
    const combinedTypes = [type1, type2].sort().join('')

    switch (combinedTypes) {
        case 'AB': return 'The Pragmatic Connector'
        case 'AC': return 'The Pragmatic Innovator'
        case 'AD': return 'The Pragmatic Hacker'
        case 'BC': return 'The Connector Innovator'
        case 'BD': return 'The Connector Hacker'
        case 'CD': return 'The Innovator Hacker'
        default: return ''
    }
}

const getTiebreakerPersonaLabel = (types: string[]) => {
    const [type1, type2, type3] = types.sort()
    
    if (type1 === 'A' && type2 === 'B') return 'The Pragmatic Connector'
    if (type1 === 'A' && type2 === 'C') return 'The Pragmatic Innovator'
    if (type1 === 'A' && type2 === 'D') return 'The Pragmatic Hacker'
    if (type1 === 'B' && type2 === 'C') return 'The Connector Innovator'
    if (type1 === 'B' && type2 === 'D') return 'The Connector Hacker'
    if (type1 === 'C' && type2 === 'D') return 'The Innovator Hacker'

    return getPersonaLabel(type1) // Fallback
}
</script>
