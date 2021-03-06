/*
 * Search for indicators and create an article with data from pmo.js
 */
(function($, window, document, Chartist, PMO){
  'use strict';
  // define the elements of interest
  const search = document.querySelector('.search-text');
  const index = document.querySelector('.index-container');
  // Search the data
  function searchData(task){
    fetch('https://cdn.jsdelivr.net/gh/DurhamRegionHARP/PMO-data-explorer@gh-pages/_data/pmo.json')
      .then(function(response){
        if(!response.ok){
          const snackbar = document.getElementById('snackbar-error');
          snackbar.classList.add('show');
          // Remove the "show" class after 3 seconds
          setTimeout(function(){
            snackbar.classList.remove('show');
          }, 3000); 
        } else {
          return response.json();
        }
      })
      .then(function(data){
        const searchFunc = {
          qry: function(elem){
            const regex = new RegExp(task.value, 'i');
            if (regex.test(elem.pmoName) || regex.test(elem.category) || regex.test(elem.description) || regex.test(elem.tags.join(' '))){
              return elem;
            }
          },
          cat: function(elem){
            if (elem.category.split(' ').join('-').toLowerCase() === task.value){
              return elem;
            }
          },
          ind: function(elem){
            if (elem.pmoName.split(' ').join('-').toLowerCase() === task.value){
              return elem;
            }
          }
        }  
        const found = data.indicators.filter( searchFunc[task.action] );
        if(task.action === 'qry'){
          handleSearchResult(found);
        }
        found.forEach(function(el){
          buildArticleNode(el);
        });           
      })
      .catch(function(error){
        console.log(error);
        const snackbar = document.getElementById('snackbar-error');
        snackbar.classList.add('show');
        // Remove the "show" class after 3 seconds
        setTimeout(function(){
          snackbar.classList.remove('show');
        }, 3000);
      });
  }
  // Handle the result
  // TODO:
  //  - Google analytics log this query -> query = search.value.trim()
  function handleSearchResult(data){
    const amount = data.length;
    const message = document.createElement('p');
    let messageHtml = amount + ' result' + ( amount === 1 ? '' : 's') + ' found';
    if (amount === 0){
      messageHtml += '<p>Why not <a href="#">suggest</a> this topic be added?</p>';
    }
    message.insertAdjacentHTML('afterbegin', messageHtml);
    // Check whether a "search-feedback" element exists
    const messageSpan = document.querySelector('.search-feedback');
    if(messageSpan){
      // We've got a message on screen already
      // remove the former and add the current
      messageSpan.removeChild(messageSpan.firstChild);
      messageSpan.appendChild(message);
      search.parentNode.appendChild(messageSpan);
    }
    else{
      // "search-feedback" element does not exist
      // Create it
      const messageContainer = document.createElement('span');
      messageContainer.setAttribute('class', 'search-feedback');
      messageContainer.appendChild(message);
      search.parentNode.appendChild(messageContainer);
    }
  }
  // Reset the search
  function resetSearch(){
    const messageElem = document.querySelector('.search-feedback');
    if(messageElem){
      search.parentNode.removeChild(messageElem);
    }
  }
  // Reset the indicator block
  function resetList(){
    const list = document.getElementById('cards');
    while(list.firstChild){ 
      list.removeChild(list.firstChild);
    }
  }
  // Build the article
  function buildArticleNode(indicator){
    // Only build if an indicator block does not exist
    const _indicator = new PMO(indicator);
    let article = document.querySelector('.indicator-' + _indicator.slug);
    if (!article){
      _indicator.create();
      _indicator.chartsToBuild.forEach(function(chart){
        buildArticleCharts(`#${_indicator.slug}-${chart}`, _indicator.chartData[chart]);
      });
      let article = document.querySelector('.indicator-' + _indicator.slug);
      article.addEventListener('click', function(event){
        if(event.target.tagName === 'BUTTON'){
          const parent = event.target.parentNode;
          if(parent.hasChildNodes()){
            parent.childNodes.forEach(function(button){
              button.classList.remove('active');
            });
          }
          event.target.classList.add('active');
        }
      });
    }
  }
  function buildArticleCharts(chartName, data){
    const upper = data['series'].map(function(el){
      return el['cl'].map(function(el){
        return el[0];
      });
    });
    const lower = data['series'].map(function(el){
      return el['cl'].map(function(el){
        return el[1];
      });
    });
    const notes = data['series'].map(function(el){
      return el['notes'];
    });
    const chartOpts = {
      axisX : {
        showGrid: false
      },
      axisY : {
        labelInterpolationFnc: function(value){
          return value + '%';
        },
        onlyInteger: true
      },
      height: '250px',
      width: '1100px',
      high: 100,
      low: 0,
      showGridBackground: true,
      seriesBarDistance: 22,
      plugins: [
        Chartist.plugins.errorBars({
          orientation: 'vertical',
          confidenceLimit: {
            upper: upper,
            lower: lower
          }
        }),
        Chartist.plugins.tooltip({
          tooltipFnc: function(meta, value){
            let metaText = (meta == "null") ? "" : `<br>${meta}`;
            return `${value}%${metaText}`;
          }
        }),
        Chartist.plugins.legend({
          className: "list-inline",
          clickable: false
        }),
        Chartist.plugins.ctAccessibility({
          caption: 'OSDUHS Results',
          seriesHeader: 'Analysis group',
          valueTransform: function(value){
            return value + '%';
          }
        })
      ]
    };
    const responsiveOpts = [
      ['screen and (max-width: 767px)', {
        width: '650px',
        seriesBarDistance: 15,
        chartPadding: {
          right: 25
        }
      }],
      ['screen and (min-width: 768px)', {
        width: '680px',
        seriesBarDistance: 22,
      }],
      ['screen and (min-width: 992px)', {
        seriesBarDistance: 22,
        width: '900px',
      }],
      ['screen and (min-width: 1200px)', {
        seriesBarDistance: 22,
        width: '1100px',
      }],
    ];
    let chart = new Chartist.Bar(chartName, data, chartOpts, responsiveOpts);
    chart.on('draw', function(component){
      if (component.type === 'bar'){
        component.element.attr({ "ct:meta": this[component.seriesIndex][component.index] });
      }
    }.bind(notes));
    $(".wb-toggle").trigger("wb-init.wb-toggle");
    $(".wb-tabs").trigger("wb-init.wb-tabs");
  }
  document.addEventListener('DOMContentLoaded', function(){
    search.addEventListener('input', function(e){
      let listDiv = document.getElementById('cards');
      listDiv.setAttribute('class', 'indicator-list');
      if(typeof this.toId === 'number'){
        clearTimeout(this.toId);
        this.toId = undefined;
      }
      resetList();
      this.toId = setTimeout(function(evt){
        let currentQuery = evt.target.value;
        if(!currentQuery.length){
          resetSearch();
          listDiv.classList.remove('indicator-list');
          return;
        }
        const hashString = `#qry=${currentQuery}`;
        const info = hashString.substr(1).split("=");
        dataLayer.push({
          'event': 'query',
          'query_string': info[1]
        });
        window.location.hash = hashString;
        searchData({
          action: info[0],
          value: info[1].replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&') // thanks to: developer.mozilla.org
        });
      }.bind(this), 600, e);
    });
    index.addEventListener('click', function(e){
      if(e.target.className === "index-link"){
        resetList();
        let listDiv = document.getElementById('cards');
        listDiv.setAttribute('class', 'indicator-list');  
        const hashString = e.target.hash;
        const info = hashString.substr(1).split("=");
        const $closeBtn = $("#close-index");
        const settings = $closeBtn.data("toggle");
        window.location.hash = e.target.hash;
        searchData({
          action: info[0],
          value: info[1],
        });
        // Simulatle closing the data index as this will
        // take up a lot of real estate 
        $closeBtn.trigger("toggle.wb-toggle", settings);
      }      
    });
  });
})($, window, document, Chartist, PMO);
