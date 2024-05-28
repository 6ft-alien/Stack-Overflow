import React from 'react'

const Avatar = ({ children, backgroundColor, px, py, color, borderRadius, fontSize, cursor }) => {

    const style = {
        backgroundColor,
        padding: `${py} ${px}`, // Use template literals correctly
        color: color || 'black',
        borderRadius,
        fontSize: fontSize || '15px', // Default fontSize if not provided
        textAlign: "center",
        cursor: cursor || 'default', // Default cursor if not provided
        textDecoration: "none"
    }
 
  return (
    <div style={ style }>
        { children }
    </div>
  )
}

export default Avatar
