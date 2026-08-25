
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById ('task-input');
    const addTaskBtn = document.getElementById ('add-task-btn');
    const taskList = document.getElementById ('task-list');
    const finish = document.querySelector('.finish');
    const todosContainer = document.querySelector('.todos-container');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');


    const toggleFinishState = () => {
        finish.style.display = taskList.children.length 
        === 0 ? 'block': 'none'; 
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };
    
    const updateProgress = () => {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

    progressBar.style.width = totalTasks
        ? `${(completedTasks / totalTasks) * 100}%`
        : '0%';

    progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
};
    
    const addTask = (text, completed = false) => {

      const taskText = text || taskInput.value.trim(); 

      if(!taskText) {

        return;

      }

      const li = document.createElement('li');
      
      li.innerHTML = `
      <input type="checkbox" class="checkbox" $ {completed ? 'checked' : ''} />
      
      <span>${taskText}</span>
      
      <div class="task-buttons">

        <button class="edit-btn">
        <i class="fa-solid fa-pen"></i>
        </button>

        <button class="delete-btn">
        <i class="fa-solid fa-trash"></i>
        </button>
        
        </div>
      `;

        const checkbox =  li.querySelector('.checkbox');

        const editBtn = li.querySelector('.edit-btn');

        const deleteBtn = li.querySelector('.delete-btn');

        deleteBtn.addEventListener('click', () => {
             li.remove();
             toggleFinishState();
             updateProgress();
        });
        
        
        if (completed) {
            li.classList.add('completed');

            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';

        }

        checkbox.addEventListener('change', () => {
            
            const isChecked = checkbox.checked;
            
            li.classList.toggle('completed', isChecked);

            editBtn.disabled = isChecked;

            editBtn.style.opacity = isChecked ? '0.5' : '1';
           
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';

            updateProgress();

        });

        editBtn.addEventListener('click', () => {

            if(!checkbox.checked) {

                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleFinishState();
                updateProgress();
            }
        });


        taskList.appendChild(li);

        taskInput.value = '';

        toggleFinishState();

        updateProgress();

    };


    const form = document.querySelector('.input-area');

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        addTask();

    });

});