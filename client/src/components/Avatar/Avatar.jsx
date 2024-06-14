import React from 'react';

const Avatar = ({ children, backgroundColor, color, borderRadius, fontSize, fontWeight, cursor, size }) => {

    const colors = [
        '#00008B', // DarkBlue
        '#2F4F4F', // DarkSlateGray
        '#8B0000', // DarkRed
        '#006400', // DarkGreen
        '#4B0082', // Indigo
        '#2E2E2E', // DarkGray
        '#5A5A5A', // DarkGray
        '#8B008B', // DarkMagenta
        '#483D8B', // DarkSlateBlue
        '#8A2BE2', // BlueViolet
        '#556B2F', // DarkOliveGreen
        '#6A5ACD', // SlateBlue
        '#7B68EE', // MediumSlateBlue
        '#4682B4', // SteelBlue
        '#2E8B57', // SeaGreen
        '#8FBC8F', // DarkSeaGreen
        '#DAA520', // GoldenRod
        '#B8860B', // DarkGoldenRod
        '#CD5C5C', // IndianRed
        '#A52A2A'  // Brown
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const bgColor = backgroundColor || getRandomColor();

    const style = {
        backgroundColor: bgColor,
        color: color || 'black',
        borderRadius,
        fontSize: fontSize || '15px',
        textAlign: "center",
        cursor: cursor || 'default', 
        textDecoration: "none",
        width: size || '125px',
        height: size || '125px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        fontWeight: fontWeight || 'normal'
    }
 
  return (
    <div style={ style }>
        { children }
    </div>
  )
}

export default Avatar
