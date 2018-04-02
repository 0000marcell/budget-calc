import Route from '@ember/routing/route';
import data from '../data/budget';
import defaultObj from '../data/default-obj';

export default Route.extend({
  model(param){
    let obj = {
      name: 'new project',
      code: param.id,
      data: '' 
    };
    if(data[param.id]){
      obj.name = data[param.id].name
      obj.data = data[param.id]
    }else{
      obj.data = defaultObj;
    }
    return obj;
  }
});
