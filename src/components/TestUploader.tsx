import * as React from 'react';

import axios, {AxiosResponse} from 'axios';

import Button from '@material-ui/core/Button';
import Form from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import Typography from "@material-ui/core/Typography";

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
            <Form>
                <Typography variant={'headline'}>File Upload</Typography>
                <Input type="file" onChange={this.onChange}/>
                <Button
                    type="submit"
                    onClick={this.onFormSubmit}
                    disabled={this.state.buttonDisabled}>
                Upload
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