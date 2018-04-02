let builtInButtons = [
  {
    classes: 'shepherd-button-secondary',
    text: 'OK',
    type: 'cancel'
  }
];

let trans = {
  pt: {
    views: ['Views são as janelas da app',
          'e esse campo define a quantidade delas',
          'cada view tambem define uma rota na app'],
    models: ['Models são as estruturas que quardam o estado da app',
           'esse campo marca a quantidade delas',
           'a quantidade de models de um app é um fator',
           'determinante na complexidade, de maneira geral',
           'quanto mais models uma app tem mais complexa ela é'],
    relationships: ['Relacionamentos entre models tambem é outro fator',
                    'determinante na complexidade',
                    'MM: Complexidade alta',
                    'onde a propriedade tem varias referências de uma outra propriedade',
                    'e támbem pertence a várias outras',
                    'OO: Complexidade baixa',
                    'a propriedade tem a referência de uma outra proriedade',
                    'e támbem pertence a alguma outra de outro model',
                    'OM: Complexidade intermediária',
                    'a propriedade tem referencias de varias outros',
                    'e pertence a apenas uma'],
    mailers: ['Numero de mailers', 'mailers mandam mensagems pra e-mails automaticamente'],
    authentication: ['Autenticação do app', 'Simples: fixa, a autenticação é criada por um admin',
                      'Só esse admin pode alterar as informações', 'Completa: Qualquer usuário pode criar um perfil,',
                      'existe confirmação de e-mail e troca de senha',
                      'Facebook(Oauth 2.0): Autenticação atraves do Facebook',
                      'Google(Oauth 2.0): Autenticação pelo google'],
    appType: ['Tipo de applicativo:',
              'Mobile: applicativo celular', 'Web: app rodando em um navegador', 
              'Web mobile: app rodando em um navegador no celular', 
              'Desktop: app rodando no windows, linux ou mac',
              'API: app rodando em um servidor que desponibiliza serviços pra outros applicativos'],
    forms: ['Numero de formulários na app', 'formulário são interfaces onde usuário incluem, buscam ou modificam',
            'informações na app'],
    realTime: ['Suporte para recursos em tempo real',
               'Qualquer recurso que precise ser modificado em tempo real na app',
               'websocket dinamico: permite a criação de um numéro indeterminado de canais',
               'websocket fixo: permite a criação de um certo numero de canais especificados no campo'],
    int: ['Tipo de internacionalização da app'],
    support: ['Básico: nos primeiros 3 meses qualquer problema na app é resolvido de graça,',
              ' alteração são recalculadas neste formulário ',
              'Completa: Pequenas alteração e qualquer problema no funcionamento do app são resolvidos sem cobrança'],
    upload: ['Upload de arquivos pela app', 'os formulários para upload serão includios no campo de formulários']
  },
  en: {
    views: ['Views are the apps interfaces ',
            'and this input defines how many views are in the app'],
    models: ['Models are the structures that saves the state of the app',
             'this input defines how many models are in the app',
             'the number of models in an app is an determining factor in its complexity'],
    relationships: ['Relationships between models is another complexity factor',
                    'MM: high complexity relationship',
                    'OO: low complexity relationship',
                    'OM: medium complexity'],
    mailers: ['Mailers: Mailers are used to send mensages for e-mail automatically'],
    authentication: ['Simple: fix, the profiles is created by a admin',
                     'only this admin can change the profiles',
                     'Complete: Any user can create a profile with e-mail confirmation and support to change the password',
                     'Facebook(Oauth 2.0): Authentication through facebook',
                     'Google(Oauth 2.0): Authentication through google'],
    appType: ['App type:',
              'Mobile: mobile phone app', 'Web: app runing on a browser for desktop devices',
              'Web mobile: app runing on a browser for mobile devices', 'Desktop: app runing on windows, linux or mac',
              'API: app runing on a server that make available services for others apps'],
    forms: ['Number of forms on the app',
            'Forms are interfaces where the user can include, search and modify info on the app'],
    realTime: ['Support for real time resources: ',
               'Any resource that needs to be modified in real time in the app',
               'websocket(dynamic): allows the creation of any number of channels',
               'websocket(fix): allows the creation of a fixed number of channels'],
    int: ['Type of internationalization :'],
    support: ['Basic: on the first 3 months any problem with the app is solved for free',
              'small changes are calculated in this form ',
              'Complete: Small changes and any problem with the app are solved without charge'],
    upload: ['File upload through the app: ', 'the forms for upload will be included in the forms field.']
  }
};

export default function(lang){
  let arr = [];
  for(let key in trans.en){
    arr.push({ id: key, 
      options: { attachTo: `.budget-calc-${key} bottom`, 
      text: trans[lang][key], builtInButtons: builtInButtons }});
  }
  return arr;
}
