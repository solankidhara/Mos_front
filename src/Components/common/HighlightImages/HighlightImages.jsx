import { Container } from 'react-bootstrap';

const HighlightImages = (props) => {
      return (
            <Container className={"d-flex flex-wrap justify-content-center " + props['bs-class']}>
                  {props.hilights.map((img, index) => (
                        <img src={img.path} alt="hilight" key={index} className="img-fluid m-3" />
                  ))}
            </Container>
      );
};

export default HighlightImages;
