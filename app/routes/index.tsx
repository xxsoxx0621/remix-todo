import {Link, useNavigate } from "@remix-run/react";
import styled, {createGlobalStyle} from "styled-components";
import {
    useEffect
} from "../../../../../../../Applications/IntelliJ IDEA.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";


export default function Index() {
    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
            <h1>Welcome to Remix</h1>
            <ul>
                <li>
                    <Link to="/todo">todo</Link>
                </li>
            </ul>
        </div>
    );
};