import React, { useRef, useEffect, useState } from 'react'
import {
    select,
    scaleLinear,
    max,
    scalePoint,
    axisLeft,
    axisBottom,
    format,
} from "d3";
import './BarChart.css';
export default function ScatterPot() {
    const [data, setData] = useState([{ name: "A", value: 100000 }, { name: "B", value: 80000 }, { name: "C", value: 60000 }, { name: "D", value: 40000 }]);
    const svgRef = useRef();
    useEffect(() => {
        const svg = select(svgRef.current);
        const width = 800;
        const hieght = 450;

        const xValue = d => d.value;
        const yValue = d => d.name;
        const margin = { top: 50, right: 40, bottom: 80, left: 200 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = hieght - margin.top - margin.bottom;
        
        const xScale = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, innerWidth])
            .nice();

        const yScale = scalePoint()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.7);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        const xAxis = axisBottom(xScale)
            .tickFormat(format('.2s'))
            .tickSize(-innerHeight);

        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth);

        g.append('g')
            .call(yAxis)
            .select('.domain')
                .remove();

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
        
        xAxisG.select('.domain').remove();
        
        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 60)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text('qwertyuiop[]');

        g.selectAll('circle').data(data)
          .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', 20);
        
        g.append('text')
            .attr('class', 'title')
            .attr('y', -5)
            .text('ASDFGHJKL:1234567890');
    }, [data])
    return (
        <svg style={{ width: 800, height: 450 }} ref={svgRef}></svg>
    )
}
