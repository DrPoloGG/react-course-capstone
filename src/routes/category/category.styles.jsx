import styled from 'styled-components';

export const CategoryProducsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`

export const CategoryTitle = styled.h2`
    font-size: 40px;
    margin-bottom: 25px;
    text-align: center;
`

/*
.category-products-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
}

.category-title {
    font-size: 40px;
    margin-bottom: 25px;
    text-align: center;
}
*/