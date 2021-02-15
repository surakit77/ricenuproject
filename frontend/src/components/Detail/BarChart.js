import React, { useRef, useEffect, useState } from 'react'
import {
    select,
    scaleLinear,
    max,
    scaleBand,
    axisLeft,
    axisBottom,
    scaleOrdinal,
} from "d3";


export default function BarChart({dataBar1, keyBar1, colorBar1}) {
    const [data, setData] = useState(dataBar1);
    const [keys, setKeys] = useState(keyBar1);
    const [colors, setColors] = useState(colorBar1);

    const svgRef = useRef(null);
    const width = 700;
    const height = 400;
    const margin = { top:70, right:10, bottom:30, left:70 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const [check, setCheck] = useState(1)

    // useEffect(()=> {
    //     setData(dataBar1);
    //     setKeys(keyBar1);
    //     setColors(colorBar1);
    //     // setCheck(dataBar.some(x => x["Milled rice"]>0));;
    // },[dataBar1, keyBar1, colorBar1])
    
    useEffect(() => {
        draw();
    }, [dataBar1, keyBar1, colorBar1])
    
    const draw = () => {
        const svg = select(svgRef.current);
        const update = svg.selectAll("g").data(dataBar1);
        const enter = update.enter().append("g");
        const bars = update.merge(enter);

        const xScale0 = scaleBand()
            .domain(dataBar1.map(d => d.name))
            .range([margin.left, width-margin.right])
            .paddingInner(0.1);
        const xScale1 = scaleBand()
            .domain(keyBar1)
            .range([0, xScale0.bandwidth()])
            .padding(0.05);
        const yScale = scaleLinear()
            .domain([0, max(dataBar1, d => max(keyBar1, key => d[key]))])
            .range([height-margin.bottom, margin.top]);
        
        const yAxis = g => g
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(axisLeft(yScale).ticks(null, "s"))
            .call(g => g.selectAll(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.yScale));
        
        const xAxis = g => g
            .attr("transform", `translate(0, ${height-margin.bottom})`)
            .attr('class', 'axis-label')
            .call(axisBottom(xScale0))
            .call(g => g.selectAll(".domain").remove());

        const color = scaleOrdinal()
            .range(colorBar1);
        
        const legend = g => {
            const legendG =g
                .attr("class", "legend")
                .attr("transform", `translate(${width}, 0)`)
                .attr("text-anchor", "end")
                .attr("font-size", 10)
                .selectAll("g")
                .data(color.domain())
                .join("g")
                    .attr("transform", (d, i) => `translate(0, ${i *20})`)
            
            legendG.append("rect")
                .attr("x", -18)
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", d => color(d));
        
            legendG.append("text")
                .attr("x", -28)
                .attr("y", 9.5)
                .attr("dy", "0.35em")
                .text(d => d);
        }
        bars.attr("transform", d => `translate(${xScale0(d.name)},0)`)
            .selectAll("rect")
            .data(d => keyBar1.map(key => ({key, value: d[key]})))
            .join("rect")
              .attr("x", d => xScale1(d.key))
              .attr("y", d => yScale(d.value))
              .attr("width", xScale1.bandwidth())
              .attr("height", d => yScale(0) - yScale(d.value))
              .attr("fill", d => color(d.key));
        svg.append("g").call(xAxis)
            .selectAll("text")	
            .style("text-anchor", "end")
            .attr("transform", "rotate(-65)") ;
        svg.append("g").call(yAxis);
        svg.append("g").call(legend);

        update.exit().remove();
    };
    if(!check){
        return(
            <div>NO DATA</div>
        )
    }
    return (
        <>
        <svg style={{ width: 700, height: 500 }} ref={svgRef}></svg>
        </>
    )
}
