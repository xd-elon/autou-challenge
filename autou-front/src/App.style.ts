import styled from "styled-components";

export const GradientIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Header = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background: #fff;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const LogoSquare = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b, #fcae3b);
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-weight: 700;
  background: linear-gradient(90deg, #ff6b6b, #fcae3b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.2rem;
`;

export const Subtitle = styled.span`
  font-size: 0.75rem;
  color: #ccc;
`;

// Círculo laranja opaco no canto direito
export const HeaderCircle = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 165, 0, 0.2);
  right: -60px;
  top: -40px;
  z-index: 0;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  background: #fafafa;
  min-height: 100vh;
  font-family: Inter, sans-serif;
`;

export const Card = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

export const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
`;

export const DropZone = styled.div`
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const BrowseButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg,#ff6b6b,#fcae3b);
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  width: 50%;
`;

export const Separator = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #999;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  resize: none;
  font-size: 0.9rem;
`;

export const ProcessButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg,#ff6b6b,#fcae3b);
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover { opacity: 0.9; transform: translateY(-1px); transition: 0.2s; }

`;

export const Classification = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const Status = styled.span<{ $positive: boolean }>`
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  margin-left: 0.5rem;
  background: ${(p) => (p.$positive ? "#e6f9f0" : "#fdeaea")};
  color: ${(p) => (p.$positive ? "#1b9c6c" : "#d64545")};
  font-weight: 600;
`;

export const Label = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const ResponseBox = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  background: #fafafa;
  min-height: 100px;
  margin-bottom: 1rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const CopyButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg,#ff6b6b,#fcae3b);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; transform: translateY(-1px); }
`;

export const AltButton = styled.button`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  font-weight: 500;
  cursor: pointer;

  &:hover { opacity: 0.9; transform: translateY(-1px); transition: 0.2s; }
`;