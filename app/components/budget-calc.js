import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, set } from '@ember/object';
import defaultObj from '../data/default-obj';

import steps from './budget-shepherd-steps';

// Returns a string with all the formObjects keys 
export function formKeys(formObject){
  let arr = [];
  for(let key in formObject){
    arr.push(`${key}`); 
  }
  return arr.join(',');
}

export default Component.extend({
  currentLang: 'pt',
  tour: inject(),
  //revisions: [{id: 1, name: "Revision 1"}, 
    //{id: 2, name: "Revision 2"}],
  didReceiveAttrs(){
    let obj = this.get('obj');

    this.set('formObj', {});
    Object.keys(defaultObj).forEach((key) => {
      this.set(`formObj.${key}`, obj.data[key]); 
    });
    this.set('projectCode', obj.code);
    this.set('projectName', obj.name);
  },
  didInsertElement(){
    this._super(...arguments);
    this.get('tour').setProperties({
      autoStart: false,
      modal: true,   
      defaults: {
        classes: 'shepherd shepherd-step shepherd-element shepherd-open shepherd-theme-arrows'
      }
    });
    this.get('tour').set('steps', steps(this.get('currentLang')));
  },
  hourPrice: 22,
  calc: computed(function(){
    let form = this.sanitize(this.get('formObj'));
    return this.relativeCalc(form, 
        this.partialCalc(form))
  }),
  /**
   * removes NaN and undefines from 
   * the form object
   */
  sanitize(obj){
    for(let key in obj) {
      if(typeof(obj[key]) === "object"){
        set(obj, key, this.sanitize(obj[key]));
      }else{
        if(typeof(obj[key]) !== "boolean"){
          set(obj, key, parseInt(obj[key]) || 0);
        }
      }
    }
    return obj;
  },
  /**
   * returns the estimate number of hours
   */
  partialCalc(form){
    let nModelsTotal  = form.nModels * 1.2 * 2.5,
        nMailersTotal = form.nMailers * 1.5,
        nRelTotal     = form.nMM * 2.5 + 
                        form.nOO * 1.5 + 
                        form.nOM * 2,
        nFormsTotal = form.nForms * 3,
        loginTotal = this.calculateLogin(form.login),
        wsTotal = this.calculateWs(form.ws),
        uploadTotal = this.calculateUpload();
    let subTotal = form.nViews + nModelsTotal + nMailersTotal + nRelTotal + loginTotal + 
                   nFormsTotal + wsTotal + uploadTotal; 
    return Math.round(subTotal);
  },
  /* calculate the time that depends on the other statics 
   * hour calculations
   */
  relativeCalc(form, partialTime){
    let appTypeTotal = this.calculateAppType(form, partialTime),
         intTotal = this.calculateInt(form, partialTime),
         supTotal = this.calculateSup(form, partialTime);
    let total = (Math.round(partialTime + appTypeTotal + intTotal + supTotal)) || 0;
    return { totalTime: total,
             startTime:  (Math.floor(total/3) || 0),
             totalValue: (total * this.get('hourPrice') || 0),
             startValue: (Math.floor((total * this.get('hourPrice'))/3) || 0)};
  },

  /**
   * returns a new object with the 
   * correct login transformations based
   * on what was selected by the user
  */
  calculateLogin(obj){
    let result = 0;
    for(let key in obj){
      if(obj[key]){
        result = result + 12;
      }
    }
    return result;
  },
  calculateAppType(form, partialTime){
    let result = 0;
    if(form.appType.mobile){
      result = partialTime * 2.0;
    }
    if(form.appType.web){
      result = result + (partialTime * 1.3);
    }
    if(form.appType.wMobile){
      result = result + (partialTime * 1.3);
    }
    if(form.appType.desktop){
      result = result + (partialTime * 1.3);
    }
    if(form.appType.API){
      result = result + (partialTime * 1.3);
    }
    return result;
  },
  calculateWs(obj){
    let result = 0;
    if(obj['fix']){
      result = 3 * obj['channels'];
    }else if(obj['basic']){
      result = 9; 
    }else if(obj['dyn']){
      result = 12;
    }
    return result;
  },
  calculateInt(form, partialTime){
    let result = 0;
    if(form.int.none){
      result = 0;
    }else if(form.int.i18n){
      result = partialTime * 0.3;
    }
    return result;
  },
  calculateSup(form, subTotal){
    let result = 0;
    if(form.support.basic){
      result = subTotal * 0.1;
    }else if(form.support.complete){
      result = subTotal * 0.4;
    }
    return result;
  },
  calculateUpload(obj){
    let result = 0;
    for(let key in obj){
      if(obj['image']){
        result = result + 2;  
      }
    }
    return result;
  },
  actions: {
    save(){
      let model = this.get('model');
      let obj = {code: model.get('code'), 
        revision: model.get('revision') + 1,
        totalTime: this.get('totalTime'),
        totalValue: this.get('totalValue'),
        formObj: this.get('formObj')
      };
      this.store.createRecord('budget', obj).then(() => {
        this.get('msgs')
          .pushObject('Revision Saved!');  
      }).catch(() => {
        this.get('msgs')
          .pushObject('Something went wrong when saving!');  
      });
    },
    changeLang(val){
      this.set('currentLang', val);
      this.get('tour').cancel();
      this.get('tour').set('steps', steps(val));
      if(val === 'en'){
        this.set('calc.startValue', Math.floor(this.get('calc.startValue')/ 3));
        this.set('calc.totalValue', Math.floor(this.get('calc.totalValue') / 3));
      }else if(val === 'pt'){
        this.set('calc.startValue', Math.floor(this.get('calc.startValue') * 3));
        this.set('calc.totalValue', Math.floor(this.get('calc.totalValue') * 3));
      }
    },
    showInfo(id){
      this.get('tour').show(id);
    }
  }
});
