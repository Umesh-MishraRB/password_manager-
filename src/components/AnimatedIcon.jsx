const AnimatedIcon = ({ size = 24, color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="add-icon-square sq1" x="8" y="8" width="53" height="53" rx="12" fill={color}/>
      <rect className="add-icon-square sq2" x="75" y="8" width="53" height="53" rx="12" fill={color}/>
      <rect className="add-icon-square sq3" x="8" y="75" width="53" height="53" rx="12" fill={color}/>

      <g className="add-icon-plus" stroke={color} strokeWidth="10" strokeLinecap="round">
        <path d="M101 80 V125"/>
        <path d="M79 102 H124"/>
      </g>
    </svg>
  );
};

export default AnimatedIcon;