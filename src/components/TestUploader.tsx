import * as React from 'react';

import axios, {AxiosResponse} from 'axios';

import Button from '@material-ui/core/Button';
import Form from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Typography from "@material-ui/core/Typography";

import {AttachFile} from '@material-ui/icons'

interface IState {
    file?: File;
    buttonDisabled: boolean;
}

class TestUploader extends React.Component<{}, IState> {

    private static async fileUpload(file: File) {
        const url = (process.env.REACT_APP_URI || "localhost:3000") + "/convert/side/js";
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            responseType: "file"
        };
        return await axios.post(url, formData, config);
    }

    public state = {
        file: undefined,
        buttonDisabled: true
    };

    constructor(props: {}) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    public render() {
        return (
            <Form style={{ borderTop: "1px solid #eee", marginTop: "2vh", paddingTop: "1vh"}}>
              <Typography variant={'headline'} style={{display: "flex"}}><AttachFile style={{paddingTop: 4}}/>File Upload</Typography>
                <Input type="file" onChange={this.onChange} style={{paddingLeft: 8}}/>
                <Button
                    type="submit"
                    onClick={this.onFormSubmit}
                    disabled={this.state.buttonDisabled}
                    style={{ border: "1px solid grey", borderRadius: 8, margin: 2, }}>
                  {this.state.buttonDisabled ? "Upload your test file" : "Upload"}
                </Button>
            </Form>
        )
    }

    private onFormSubmit(e: any) {
        e.preventDefault();
        const f = this.state.file || new File([], "none");
        TestUploader.fileUpload(f).then((response: AxiosResponse) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `${f.name + '.js'}`);

            document.body.appendChild(link);
            link.click();
        })
    }

    private onChange(e: any) {
        if (e.target !== null) {
            this.setState({file: e.target.files[0], buttonDisabled: false})
        }
    }

}


export default TestUploader