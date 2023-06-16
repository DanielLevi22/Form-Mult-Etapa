const form  = document.querySelector('form');
let currentSetps = 0;
const formSteps = document.querySelectorAll('.form-step')

form.addEventListener('click', (e) =>{
  if(!e.target.matches('[data-action]')) {
    return
  }

  const actions = {
    next() {
      if(!isValidInputs()) {
        return
      }
      currentSetps++;
    },
    prev() {
    
      currentSetps--;
    }
  }

  const action = e.target.dataset.action
  actions[action]()

  
  updateActiveStep()
  updateProgressStep()

})



function updateActiveStep() {

  formSteps.forEach(step => {  step.classList.remove('active')})
  formSteps[currentSetps].classList.add('active')
}

const progressSetp = document.querySelectorAll('.step-progress [data-step]')

function updateProgressStep() {
  progressSetp.forEach((step, idx) => {
     step.classList.remove('active') 
     step.classList.remove('done')
    
     if(idx < currentSetps +1) {
       step.classList.add('active')
     }
      if(idx < currentSetps)
      step.classList.add('done')
    }
    
)}

function isValidInputs() {
  const currentFormStep = formSteps[currentSetps]

  const formFields = [... currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]
  return formFields.every((input) => input.reportValidity())
}


form.addEventListener('submit',(e) => {
  e.preventDefault();

  const data  = new FormData(form)
  alert(`Obrigado ${data.get('name')}!`)
  
})

formSteps.forEach(formStep => {
  function addhide() {
    formStep.classList.add('hide')
  }

  formStep.addEventListener('animationend',(e) => { 
    addhide()
    formSteps[currentSetps].classList.remove('hide')
  })
})