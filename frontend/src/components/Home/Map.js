import React, { useRef, useEffect, useState } from 'react'
import {
    select,
    json,
    geoPath,
    geoMercator,
    geoEquirectangular,
    geoEqualEarth
} from "d3";
import { feature } from 'topojson'
import './Map.css';
export default function Map({nutrition}) {
    const [data, setData] = useState([]);

    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        // const projection = geoMercator()
        //     .scale(2700)
        //     .rotate([-100.6331, -13.2])
        //     .translate([1000 / 2, 1000 / 2]);
        // const pathGenerator = geoPath().projection(projection);

        
        // json('https://code.highcharts.com/mapdata/countries/th/th-all.geo.json')
        json('https://raw.githubusercontent.com/apisit/thailand.json/master/thailand.json')
            .then(data => {
                var projection = geoMercator().fitSize([1000, 1000], data);
                var path = geoPath().projection(projection);
                
                svg.selectAll('path').data(data.features)
                    .enter().append('path')
                    .attr('d' , path)
                    .attr('fill','green');

                // svg.selectAll('path').data(data.features)
                //     .enter().append('path')
                //         .attr('d', path)
                //         .attr('vector-effect', 'non-scaling-stroke')
                //         .attr('class', 'thaiMap');
                    // .append('title')
                    //     .text(d => d.properties.name);
                    

            })
    }, [])
    
    return (
        <>
        <svg style={{ width: 1000, height: 1000 }} ref={svgRef}></svg>
        {console.log(isNaN(NaN))}
        </>
    )
}
