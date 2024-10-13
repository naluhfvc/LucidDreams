import React, { useState } from "react";
import {
    Link,
    Typography,
    TextField,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Button,
    Alert,
    CircularProgress,
    Container,
    InputAdornment,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser, signInWithGoogle } from "../../controllers/AuthController";

const RegisterPage = () => {
    const theme = useTheme();

    const [registerForm, setRegisterForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmSenha: "",
        dataNascimento: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isPasswordStrong = (password) => {
        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
        return (
            minLength.test(password) &&
            hasUpperCase.test(password) &&
            hasLowerCase.test(password) &&
            hasSpecialChar.test(password)
        );
    };

    const validateForm = () => {
        const { nome, email, senha, confirmSenha, dataNascimento } = registerForm;
        if (!nome.trim()) {
            setError("O nome é obrigatório.");
            return false;
        }
        if (!email) {
            setError("O e-mail é obrigatório.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, insira um e-mail válido.");
            return false;
        }
        if (!senha) {
            setError("A senha é obrigatória.");
            return false;
        }
        if (!isPasswordStrong(senha)) {
            setError("A senha não atende aos requisitos de força.");
            return false;
        }
        if (!confirmSenha) {
            setError("A confirmação da senha é obrigatória.");
            return false;
        }
        if (senha !== confirmSenha) {
            setError("As senhas não correspondem.");
            return false;
        }
        if (!dataNascimento) {
            setError("A data de nascimento é obrigatória.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const { nome, email, senha, dataNascimento } = registerForm;
        setLoading(true);
        try {
            await registerUser(email, senha, nome, dataNascimento);
        } catch (error) {
            console.error("Erro ao fazer cadastro:", error);
            setError("Falha ao fazer cadastro. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Erro ao fazer login com Google:", error);
            setError("Falha ao fazer login com Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: theme.spacing(8), mb: theme.spacing(4) }}>
            <Card elevation={6}>
                <CardHeader
                    title="Crie uma nova conta"
                    titleTypographyProps={{ variant: "h5", align: "center" }}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                    }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            type="text"
                            value={registerForm.nome}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="nome"
                        />

                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            value={registerForm.email}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="email"
                        />

                        <Tooltip
                            title={
                                <React.Fragment>
                                    <Typography variant="subtitle2">Regras de Senha Forte:</Typography>
                                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                        <li>Mínimo de 8 caracteres</li>
                                        <li>Ao menos um caractere especial (!@#$%^&*)</li>
                                        <li>Ao menos uma letra maiúscula</li>
                                        <li>Ao menos uma letra minúscula</li>
                                    </ul>
                                </React.Fragment>
                            }
                            arrow
                            placement="right"
                        >
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="senha"
                                label={
                                    <span>
                                        Senha
                                    </span>
                                }
                                type={showPassword ? "text" : "password"}
                                id="senha"
                                autoComplete="new-password"
                                value={registerForm.senha}
                                onChange={handleChange}
                                sx={{
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: theme.shape.borderRadius,
                                }}
                                aria-label="senha"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Tooltip>

                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmSenha"
                            label="Confirmar Senha"
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmSenha"
                            autoComplete="new-password"
                            value={registerForm.confirmSenha}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="confirmar senha"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="dataNascimento"
                            label="Data de Nascimento"
                            type="date"
                            id="dataNascimento"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={registerForm.dataNascimento}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="data de nascimento"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                            onClick={handleSubmit}
                            sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }}
                            startIcon={loading && <CircularProgress size={20} />}
                        >
                            {loading ? "Carregando..." : "Criar conta"}
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleGoogleLogin}
                            startIcon={<GoogleIcon />}
                            disabled={loading}
                            sx={{ mb: theme.spacing(2) }}
                        >
                            {loading ? "Carregando..." : "Login com Google"}
                        </Button>

                        <Typography variant="body2" align="center">
                            Já tem uma conta?{" "}
                            <Link
                                href="/login"
                                variant="body2"
                                sx={{
                                    color: theme.palette.primary.main,
                                    textDecoration: "none",
                                }}
                            >
                                Entrar
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default RegisterPage;