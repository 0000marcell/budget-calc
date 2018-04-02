import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  i18n: inject(),
  en: 'unselected',
  pt: 'selected',
  actions: {
    select(val){
      if(val === 'en'){
        this.set('en', 'selected');
        this.set('pt', 'unselected');
      }else{
        this.set('pt', 'selected');
        this.set('en', 'unselected');
      }
      if(this.get('changeLang')){
        this.get('changeLang')(val);
      }
      this.set('i18n.locale', val);
    }
  }
});
