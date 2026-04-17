document.addEventListener('DOMContentLoaded', () => {
    const logForm = document.getElementById('logForm');
    const logContainer = document.getElementById('logContainer');
    const clearBtn = document.getElementById('clearBtn');

    // Load existing logs
    let logs = JSON.parse(localStorage.getItem('farmLogs')) || [];

    const renderLogs = () => {
        logContainer.innerHTML = '';
        
        if (logs.length === 0) {
            logContainer.innerHTML = `<p class="text-center text-stone-400 py-10 italic">No logs yet today.</p>`;
            return;
        }

        logs.slice().reverse().forEach((log, index) => {
            const div = document.createElement('div');
            div.className = "bg-white p-4 rounded-xl border-l-4 border-emerald-500 shadow-sm flex justify-between items-start";
            div.innerHTML = `
                <div>
                    <span class="text-xs font-bold text-emerald-600 block mb-1">${log.category}</span>
                    <p class="text-stone-700">${log.note}</p>
                    <span class="text-[10px] text-stone-400">${log.time}</span>
                </div>
            `;
            logContainer.appendChild(div);
        });
    };

    // Form Submit
    logForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const category = document.getElementById('category').value;
        const note = document.getElementById('note').value;
        
        if (!note) return alert("Please add a note!");

        const newLog = {
            category,
            note,
            time: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
        };

        logs.push(newLog);
        localStorage.setItem('farmLogs', JSON.stringify(logs));
        
        logForm.reset();
        renderLogs();
    });

    // Clear Logs
    clearBtn.addEventListener('click', () => {
        if(confirm("Delete all logs?")) {
            logs = [];
            localStorage.removeItem('farmLogs');
            renderLogs();
        }
    });

    renderLogs();
})