import './styles.css';

export const HighlightedLine = ({ color = 'purple' }) => {
  return (
    <span
      className="highlightedLine"
      style={{
        backgroundColor: `${color}`,
        boxShadow: `0px -2px 4px ${color}`,
      }}
    />
  );
};
