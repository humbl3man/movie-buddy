const XIcon: React.FC<{ stroke?: string }> = (props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.75781 7.75732L16.2431 16.2426" stroke={props.stroke || '#8E85A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.75781 16.2426L16.2431 7.75732" stroke={props.stroke || '#8E85A9'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default XIcon;
