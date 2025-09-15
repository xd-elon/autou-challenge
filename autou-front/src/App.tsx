/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
} from "pdfjs-dist";

import { MdEmail } from "react-icons/md"; 
import { FaRegFileAlt } from "react-icons/fa";

import {
  Container, 
  Card, 
  SectionTitle, 
  DropZone, 
  BrowseButton, 
  Separator, 
  TextArea,
  ProcessButton, 
  Classification, 
  Status, 
  Label, 
  ResponseBox,
  ButtonRow,
  CopyButton, 
  AltButton, 
  Header, 
  Brand, 
  BrandText, 
  HeaderCircle, 
  LogoSquare,
  Subtitle, 
  Title} from "./App.style";

// lib anterior tava com bug, lembrete pra min mesmo, Configura o worker de forma compatível com Vite + TS
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [classification, setClassification] = useState<null | string>(null);
  const [reply, setReply] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcess = async () => {
    if (!emailContent.trim()) return;

    const res = await fetch("http://localhost:5000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Email Subject",
        from: "someone@email.com",
        body: emailContent,
      }),
    });

    const data = await res.json();
    if (data.ok) {
      setClassification(data.result.label);
      setReply(data.result.reply);
    }
  };

  const handleGenerateAlternative = async () => {
    if (!emailContent.trim()) return;

    const res = await fetch("http://localhost:5000/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: "Email Subject",
        from: "someone@email.com",
        body: emailContent,
      }),
    });

    const data = await res.json();
    if (data.ok) setReply(data.reply);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1500);
  };

  const handleFile = async (file: File) => {
    const mime = file.type;

    if (mime === "text/plain") {
      const text = await file.text();
      setEmailContent(text);
    } else if (mime === "application/pdf" || mime === "application/x-pdf") {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await getDocument({ data: arrayBuffer }).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(" ") + "\n";
        }

        setEmailContent(text);
      } catch (err) {
        console.error("Erro ao processar PDF:", err);
        alert("Não foi possível ler o PDF. Verifique se o arquivo está correto.");
      }
    } else {
      alert("Formato não suportado. Use .txt ou .pdf");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) handleFile(e.target.files[0]);
  };

  return (
    <>
      <Header>
        <Brand>
          <LogoSquare>A</LogoSquare>
          <BrandText>
            <Title>AutoU</Title>
            <Subtitle>Email Classification & Response System</Subtitle>
          </BrandText>
        </Brand>
        <HeaderCircle />
      </Header>

      <Container>
        <Card>
          <SectionTitle><MdEmail /> Email Input</SectionTitle>
    
          <DropZone onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <p>Drag & drop email files here</p>
            <small>Supports .txt and .pdf formats</small>
            <BrowseButton onClick={handleBrowseClick}>Browse Files</BrowseButton>
            <input
              type="file"
              accept=".txt,.pdf"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </DropZone>

          <Separator>OR</Separator>

          <TextArea
            placeholder="Paste email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />

          <ProcessButton onClick={handleProcess}>Process Email</ProcessButton>
        </Card>

        <Card>
          <SectionTitle><FaRegFileAlt /> Results</SectionTitle>
          {classification && (
            <>
              <Classification>
                Classification:{" "}
                <Status $positive={classification === "productive"}>
                  {classification}
                </Status>
              </Classification>
              <Label>Suggested Response</Label>
              <ResponseBox>{reply}</ResponseBox>
              <ButtonRow>
                <CopyButton onClick={handleCopy}>
                  {copyStatus ? "Copied!" : "Copy Response"}
                </CopyButton>
                <AltButton onClick={handleGenerateAlternative}>
                  Generate Alternative
                </AltButton>
              </ButtonRow>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}

export default App;
