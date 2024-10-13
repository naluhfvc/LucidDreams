// Importações necessárias do React e do MUI
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { loginUser, signInWithGoogle } from "../../controllers/AuthController";

const LoginPage = () => {
    const theme = useTheme();

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { email, password } = loginForm;
        if (!email) {
            setError("O e-mail é obrigatório.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, insira um e-mail válido.");
            return false;
        }
        if (!password) {
            setError("A senha é obrigatória.");
            return false;
        }
        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const { email, password } = loginForm;
        setLoading(true);
        try {
            await loginUser(email, password);

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError("Falha ao fazer login. Verifique suas credenciais.");
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

    return (
        <Container maxWidth="sm" sx={{ mt: theme.spacing(8), mb: theme.spacing(4) }}>
            <Card elevation={6}>
                {/* Cabeçalho do Card */}
                <CardHeader
                    title="Faça login em sua conta"
                    titleTypographyProps={{ variant: "h5", align: "center" }}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                    }}
                />
                <CardContent>
                    <Stack spacing={2}>
                        {/* Exibição de mensagens de erro */}
                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}

                        {/* Campo de E-mail */}
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={loginForm.email}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="email"
                        />

                        {/* Campo de Senha com botão para alternar visibilidade */}
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={loginForm.password}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: theme.shape.borderRadius,
                            }}
                            aria-label="password"
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

                        {/* Link para recuperação de senha */}
                        <Stack direction="row" justifyContent="flex-end">
                            <Link
                                href="#"
                                variant="body2"
                                sx={{
                                    color: theme.palette.primary.main,
                                    textDecoration: "none",
                                }}
                            >
                                Esqueceu a senha?
                            </Link>
                        </Stack>

                        {/* Botão de Login */}
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
                            {loading ? "Carregando..." : "Entrar"}
                        </Button>

                        {/* Botão de Login com Google */}
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

                        {/* Link para criar uma nova conta */}
                        <Typography variant="body2" align="center">
                            Não tem uma conta?{" "}
                            <Link
                                href="/register"
                                variant="body2"
                                sx={{
                                    color: theme.palette.primary.main,
                                    textDecoration: "none",
                                }}
                            >
                                Criar conta
                            </Link>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginPage;