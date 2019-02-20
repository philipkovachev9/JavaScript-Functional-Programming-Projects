const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT:',
  CALORIE_INPUT: 'CALORIE_INPUT'
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm
  }
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description
  }
}

export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIE_INPUT,
    calories
  }
}

function update(msg, model) {
  switch(msg.type) {
    case MSGS.SHOW_FORM: {
       const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 }
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description};
    }
    case MSGS.CALORIE_INPUT: {
      const { calories } = msg;
      return { ...model, calories};
    }
  }
  return model;
}

export default update;