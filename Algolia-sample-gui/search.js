'use strict';
/* global instantsearch */

var search = instantsearch({
  appId: 'UL5C2EMZSX',
  apiKey: '8c3fb88ff1733c780fa1bfbc34a96a3a',
  indexName: 'Agile'
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Ask a question'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.on('render', function() {
  $('.product-picture img').addClass('transparent');
  $('.product-picture img').one('load', function() {
      $(this).removeClass('transparent');
  }).each(function() {
      if(this.complete) $(this).load();
  });
});

var hitTemplate =
  '<article class="hit">' +
      // '<div class="product-picture-wrapper">' +
      //   '<div class="product-picture"><img src="{{image}}" /></div>' +
      // '</div>' +
      '<div class="product-desc-wrapper">' +
        '<div class="question"><a href={{ULR.value}}> {{{_highlightResult.Question.value}}} </a></div>' + //URL not working
        '<div class="answer">{{{_highlightResult.Answer.value}}}</div>' +
        '<div class="author"> author {{Author}}  </div>' +
         '<div class="date"> updated {{Date}}  </div>' +
      '</div>' +
  '</article>';

var noResultsTemplate =
  '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';

var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"></a>';

var facetTemplateCheckbox =
  '<a href="javascript:void(0);" class="facet-item">' +
    '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}' +
    '<span class="facet-count">({{count}})</span>' +
  '</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{name}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 16,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    },
    transformData: function(hit) {
      hit.stars = [];
      for (var i = 1; i <= 5; ++i) {
        hit.stars.push(i <= hit.rating);
      }
      return hit;
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
      next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
    },
    showFirstLast: false
  })
);

// search.addWidget(
//   instantsearch.widgets.hierarchicalMenu({
//     container: '#categories',
//     attributes: ['category', 'sub_category', 'sub_sub_category'],
//     sortBy: ['name:asc'],
//     templates: {
//       item: menuTemplate
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#materials',
//     attributeName: 'materials',
//     operator: 'or',
//     limit: 10,
//     templates: {
//       item: facetTemplateCheckbox,
//       header: '<div class="facet-title">Materials</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#colors',
//     attributeName: 'colors',
//     operator: 'or',
//     limit: 10,
//     templates: {
//       item: facetTemplateColors,
//       header: '<div class="facet-title">Colors</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.starRating({
//     container: '#rating',
//     attributeName: 'rating',
//     templates: {
//       header: '<div class="facet-title">Ratings</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.priceRanges({
//     container: '#prices',
//     attributeName: 'price',
//     cssClasses: {
//       list: 'nav nav-list',
//       count: 'badge pull-right',
//       active: 'active'
//     },
//     templates: {
//       header: '<div class="facet-title">Prices</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.sortBySelector({
//     container: '#sort-by-selector',
//     indices: [
//       {name: 'ikea', label: 'Featured'},
//       {name: 'ikea_price_asc', label: 'Price asc.'},
//       {name: 'ikea_price_desc', label: 'Price desc.'}
//     ],
//     label:'sort by'
//   })
// );

// search.addWidget(
//   instantsearch.widgets.clearAll({
//     container: '#clear-all',
//     templates: {
//       link: '<i class="fa fa-eraser"></i> Clear all filters'
//     },
//     cssClasses: {
//       root: 'btn btn-block btn-default'
//     },
//     autoHideContainer: true
//   })
// );

search.start();
