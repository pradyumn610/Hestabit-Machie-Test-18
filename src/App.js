import './App.css';
import { FaFacebookF, FaTwitterSquare, FaYoutube, FaCloud } from 'react-icons/fa';
import { IconContext } from "react-icons";
import React, { Component } from "react";
import Chart from "react-apexcharts";
//import canvg from 'canvg';

import html2canvas from 'html2canvas'
import Canvg  from 'canvg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    }
  }

  _onCapture = async() => {

    const options = {
  scale: 1,
  allowTaint: true, useCORS: true,
  foreignObjectRendering: true
  
};


        var nodesToRecover = [];
        var nodesToRemove = [];

        var svgElems = document.body;

        for (var i=0; i<svgElems.length; i++) {
            var node = svgElems[i];
            var parentNode = node.parentNode;
            var svg = parentNode.innerHTML;

           var canvas = document.createElement('canvas');


            //const canvas = document.querySelector('canvas');
            //const ctx = canvas.getContext('2d');

             //const canvas = document.querySelector('canvas');
              const ctx = canvas.getContext('2d');
    
    

           //Canvg(canvas, svg);
          // const ctx = canvas.getContext('2d');

           const v = await Canvg.from(canvas, svg);
           v.start();

           //Canvg(canvas, svg);//(canvas, svg);
           //await v.render();

           //const blob = await canvas.convertToBlob();
           //const pngUrl = URL.createObjectURL(blob);

          //self.postMessage({
          //pngUrl
          //});

          // v = await Canvg.from(canvas, svg);

            nodesToRecover.push({
                parent: parentNode,
                child: node
            });
            parentNode.removeChild(node);

            nodesToRemove.push({
                parent: parentNode,
                child: canvas
            });

            parentNode.appendChild(canvas);
        }

    html2canvas(svgElems, options).then(canvas => {
      //this.clipImage = canvas.toDataURL('image/png');

      var ctx = canvas.getContext('2d');
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

      document.body.appendChild(canvas);

  });

  
    /*html2canvas(document.body)
    .then(canvas => this._saveAs(canvas.toDataURL(), 'screenshot'))
    .catch(err => console.log('err', err))*/
  }

  _saveAs = (uri, filename) => {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      link.click();
    } else {
      window.open(uri);
    }
  }


  render(){
    return (

      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="600"
            />
          </div>
        </div>
         
        <div className='text-center'>

        

              <IconContext.Provider
                  value={{ color: 'black', size: '100px' }}
                >
                  <div className="float-left">
                     <FaFacebookF />
                  </div>
                </IconContext.Provider>

                 <IconContext.Provider
                  value={{ color: 'black', size: '100px' }}
                >
                  <div className="float-left">
                     <FaTwitterSquare />
                  </div>
                </IconContext.Provider>

                 <IconContext.Provider
                  value={{ color: 'black', size: '100px' }}
                >
                  <div className="float-left">
                     <FaYoutube />
                  </div>
                </IconContext.Provider>

                 <IconContext.Provider
                  value={{ color: 'black', size: '100px' }}
                >
                  <div className="float-left">
                     <FaCloud />
                  </div>
                </IconContext.Provider>


          
        </div>
        <button className="btn btn-info mt-3" onClick={this._onCapture}>Screenshot</button>
      </div>
    )
  }
}

export default App;
