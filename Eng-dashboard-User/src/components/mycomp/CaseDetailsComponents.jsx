import styled from 'styled-components';

export const TwoSidedContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    align-item: center;
    justify-content: space-between;
    padding: 0px;
    margin: 0px;
    font-size: 90%;
`;

export const LeftSide = styled.div`
    width: 50%;

    strong {
        padding: 0px;
        margin: 5px 0;
    }
`;

export const RightSide = styled.div`
    width: 50%;

    p {
        padding: 0px;
        margin: 5px 0;
    }
`;

export const SectionCategory = styled.h3`
    margin: 10px 0;
`;

export const TextArea = styled.textarea`
    padding: 5px;
    border-radius: 3px;
    border: 1px solid blue;
    width: 100%;
    margin-bottom: 20px;
`;