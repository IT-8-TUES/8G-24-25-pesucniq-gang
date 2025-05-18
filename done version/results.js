 let questions = window.questions || [];
        let userAnswers = window.userAnswers || [];
        let score = 0;

        function showStats() {
            const statsScreen = document.createElement('div');
            statsScreen.className = 'stats-screen';
            statsScreen.innerHTML = `
                 <div class="stats-content">
                    <div class="stats-header">
                        <h2>Quiz Statistics</h2>
                        <button class="close-stats" onclick="this.closest('.stats-screen').remove()">Close</button>
                    </div>
                    <table class="review-table">
                        <tr>
                            <th>#</th>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Result</th>
                        </tr>
                        
                        ${questions.map((q, i) => {
                            const userAnswer = userAnswers[i];
                            const correctAnswer = q.correct;
                            const isCorrect = userAnswer === correctAnswer;
                            return `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${q.question}</td>
                                    <td class="${isCorrect ? 'correct' : 'wrong'}">${q.options[userAnswer] || '-'}</td>
                                    <td class="correct">${q.options[correctAnswer]}</td>
                                    <td class="${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✓' : '✗'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </table>
                </div>
            `;
            document.body.appendChild(statsScreen);
        }