
const TruncateText = ({ text, length = 20 }: TruncateTextProps) => {

    const truncatedText = text.length > length ? text.slice(0, length) + "..." : text;
    
    return <span>{truncatedText}</span>;
};

type TruncateTextProps = {
  text: string;
  length?: number;
};

export default TruncateText;
