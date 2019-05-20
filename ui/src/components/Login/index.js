import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';

import { REGEXP, MESSAGE } from '../../config.json';

const styles = theme => ({
	container: {
		position: 'fixed',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	paper: {
		padding: '15px',
		margin: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxWidth: '400px',
	},
	form: {
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		margin: theme.spacing.unit,
		width: '100%',
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		fontSize: 20,
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
});

const Login = ({ classes, onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(true);
	const [loading, setLoading] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPasswrod] = useState(true);
	const [validServer, setValidServer] = useState(true);

	const onValid = () => {
		const validEmail = new RegExp(REGEXP.email).test(email);
		const validPassword = new RegExp(REGEXP.password).test(password);
		setValidEmail(validEmail);
		setValidPasswrod(validPassword);
		return validEmail && validPassword;
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (onValid()) {
			setLoading(true);
			try {
				await onLogin(email, password, remember);
			} catch (e) {
				setValidServer(false);
				setLoading(false);
			}
		}
	};

	return (
		<main className={classes.container}>
			<CssBaseline />
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{!validServer && (
					<SnackbarContent
						className={classes.error}
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar" className={classes.message}>
								<Icon className={classes.icon}>error_icon</Icon>
								{MESSAGE.ERROR.NOT_USER}
							</span>
						}
					/>
				)}
				<form className={classes.form} onSubmit={onSubmit}>
					<TextField
						label="Email Address"
						value={email}
						onChange={e => setEmail(e.target.value)}
						margin="normal"
						fullWidth
						placeholder="test@test.com"
						error={!validEmail}
						helperText={!validEmail && MESSAGE.ERROR.EMAIL}
					/>
					<TextField
						label="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						margin="normal"
						fullWidth
						type="password"
						error={!validPassword}
						helperText={!validPassword && MESSAGE.ERROR.PASSWORD}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={remember}
								onChange={e => setRemember(e.target.checked)}
								color="primary"
							/>
						}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						disabled={loading}
						className={classes.submit}
					>
						Sign in
					</Button>
				</form>
			</Paper>
		</main>
	);
};

Login.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
