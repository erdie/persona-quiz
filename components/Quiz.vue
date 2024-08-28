<template>
    <div class="max-w-2xl mx-auto p-4" v-if="!submitted">
        <div v-for="(question, index) in questions" :key="index" class="mb-6">
            <h2 class="text-lg font-bold mb-2">{{ index + 1 }}. {{ question.text }}</h2>
            <div v-for="(option, optIndex) in question.options" :key="optIndex" class="mb-1">
                <label class="flex items-center">
                    <input
                        type="radio"
                        :name="`question-${index}`"
                        :value="option"
                        v-model="answers[index]"
                        class="mr-2"
                        required
                    />
                    {{ option }}
                </label>
            </div>
        </div>
    
        <button @click="submitQuiz" class="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Quiz
        </button>
    </div>
    
    <div v-else class="max-w-2xl mx-auto mt-4 text-center">
        <h3 class="text-xl font-bold">Results</h3>
        <p>You are: <span class="font-bold">{{ personaType }}</span></p>
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
const personaType = ref('')

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
