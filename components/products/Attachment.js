import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components'
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";


const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file){
      url
    }
  }
`;

const DELETE_FILE = gql`
  mutation DeleteFile($path: String!) {
    deleteFile(path: $path){
      url
    }
  }
`;


function Attachmnet(props) {
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [deleteFile, { data }] = useMutation(DELETE_FILE);

  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );

  const dropzone = useDropzone({ onDrop, multiple:false, maxSize:10000000 });


  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = dropzone;




  if(JSON.stringify(props.accepted) !== JSON.stringify(acceptedFiles)){
    props.acceptedFiles(acceptedFiles)
  }

  const files = props.files.map((file, index) => (
    <Wrapper key={index}>
      <Img alt="signaco priponka" src="../../../../icons/attachment.svg" />
      <WrapperFile>
        <Title2>{file.path}</Title2>
        <WrapperFile2>
          <Title>{(file.size*0.000001).toFixed(3)} MB</Title>
          <Img2
            onClick={()=>{
              deleteFile({ variables: { path:props.files[0].path } });
              props.deleteFiles();
            }}
           alt="signaco zapri" src="../../../../icons/close.svg" />
        </WrapperFile2>
      </WrapperFile>
    </Wrapper>
  ));
  
  return (
      <Attachment>
        {(props.fromCart && !props.files[0] && props.file) &&
          <Wrapper>
            <Img alt="signaco priponka" src="../../../../icons/attachment.svg" />
            <WrapperFile>
              <Title2>{props.file.replace("https://storage.googleapis.com/signaco/attachments/", "")}</Title2>
              <WrapperFile2>
                <Img2
                  onClick={()=>{
                    // deleteFile({ variables: { path:props.file.replace("https://storage.googleapis.com/signaco/attachments/", "") } });
                    props.deleteFiles();
                  }}
                 alt="signaco zapri" src="../../../../icons/close.svg" />
              </WrapperFile2>
            </WrapperFile>
          </Wrapper>
        }
        <aside>
          {files}
        </aside>
        <div style={{outlineColor: "#4CAF50",borderRadius:0}} {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <WrapperDrop
            onDrop={()=>{
                if(props.files[0]) deleteFile({ variables: { path:props.files[0].path } });
                props.deleteFiles();
              }}
            onClick={()=>{
                if(props.files[0]) deleteFile({ variables: { path:props.files[0].path } });
                props.deleteFiles();
              }}
           over={isDragActive}>
            <Img alt="signaco priponka" src="../../../../icons/attachment.svg" />
            {props.files.length === 1 ? 
              <Title>Zamenjaj datoteko</Title>
              :
              <Title>Priloži datoteko</Title>
            }
          </WrapperDrop>
        </div>
      </Attachment>
  );
}


export const Attachment = styled.section(props => ({
  
}));

export const Title = styled.div(props => ({
  fontSize:14,
  whiteSpace: "nowrap",
}));
export const Title2 = styled.div(props => ({
  fontSize:14,
}));
export const Img = styled.img(props => ({
  width:24,
  marginRight:10,
}));
export const Img2 = styled.img(props => ({
  width:12,
  marginLeft:10,
  cursor:"pointer",
}));

export const WrapperDrop = styled.div(props => ({
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  paddingBottom:12,
  paddingTop:12,
  marginBottom:16,
  marginTop:12,
  transition:"0.1s",
  paddingLeft:props.over ? 12 : 0,
  border:props.over ? "2px solid #4CAF50" : "2px solid #F1F1F4",
}));

export const Wrapper = styled.div(props => ({
  display:"flex",
  width:"calc(100% - 2px)",
  justifyContent:"flex-start",
  alignItems:"center",
  marginTop:10,
}));
export const WrapperFile = styled.div(props => ({
  display:"flex",
  width:"100%",
  justifyContent:"space-between",
  alignItems:"center",
}));
export const WrapperFile2 = styled.div(props => ({
  display:"flex",
  alignItems:"center",
}));



export default Attachmnet