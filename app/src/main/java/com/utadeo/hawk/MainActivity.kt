package com.utadeo.hawk

import android.content.res.Configuration
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.annotation.DrawableRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.CheckBoxOutlineBlank
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.utadeo.hawk.ui.theme.HawkTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: android.os.Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HawkTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    LoginScreen()
                }
            }
        }
    }
}

@Composable
fun LoginScreen() {
    val scrollState = rememberScrollState()
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(WindowInsets.statusBars.asPaddingValues())
            .padding(WindowInsets.navigationBars.asPaddingValues())
    ) {
        androidx.compose.foundation.layout.BoxWithConstraints(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
        ) {
            val isCompact = maxWidth < 700.dp
            if (isCompact) {
                Column(
                    modifier = Modifier.fillMaxSize()
                ) {
                    LoginImagePane(
                        imageRes = R.drawable.login_foliage,
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(260.dp)
                    )
                    LoginFormPane(
                        compact = true,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(horizontal = 24.dp, vertical = 28.dp)
                    )
                }
            } else {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .heightIn(min = 800.dp)
                ) {
                    LoginImagePane(
                        imageRes = R.drawable.login_foliage,
                        modifier = Modifier
                            .weight(0.47f)
                            .fillMaxHeight()
                    )
                    Box(
                        modifier = Modifier
                            .weight(0.53f)
                            .fillMaxHeight(),
                        contentAlignment = Alignment.Center
                    ) {
                        LoginFormPane(
                            compact = false,
                            modifier = Modifier
                                .widthIn(max = 360.dp)
                                .padding(horizontal = 32.dp, vertical = 40.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun LoginImagePane(
    @DrawableRes imageRes: Int,
    modifier: Modifier = Modifier
) {
    Box(modifier = modifier) {
        Image(
            painter = painterResource(id = imageRes),
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize()
        )
    }
}

@Composable
private fun LoginFormPane(
    compact: Boolean,
    modifier: Modifier = Modifier
) {
    var email by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }
    var rememberFor30Days by rememberSaveable { mutableStateOf(false) }

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Welcome back",
            style = TextStyle(
                fontSize = 30.sp,
                lineHeight = 38.sp,
                fontWeight = FontWeight.SemiBold,
                color = HawkGray900
            )
        )
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = "Welcome back! Please enter your details.",
            style = TextStyle(
                fontSize = 16.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.Normal,
                color = HawkGray600
            )
        )

        Spacer(modifier = Modifier.height(32.dp))

        LabeledInput(
            label = "Email",
            value = email,
            placeholder = "Enter your email",
            onValueChange = { email = it },
            visualTransformation = VisualTransformation.None
        )

        Spacer(modifier = Modifier.height(20.dp))

        LabeledInput(
            label = "Password",
            value = password,
            placeholder = "••••••••",
            onValueChange = { password = it },
            visualTransformation = PasswordVisualTransformation()
        )

        Spacer(modifier = Modifier.height(20.dp))

        if (compact) {
            Column(modifier = Modifier.fillMaxWidth()) {
                RememberRow(
                    checked = rememberFor30Days,
                    onCheckedChange = { rememberFor30Days = it }
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = "Forgot password",
                    style = TextStyle(
                        fontSize = 14.sp,
                        lineHeight = 20.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = HawkNeutral500
                    ),
                    modifier = Modifier.clickable(
                        indication = null,
                        interactionSource = remember { MutableInteractionSource() }
                    ) { }
                )
            }
        } else {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                RememberRow(
                    checked = rememberFor30Days,
                    onCheckedChange = { rememberFor30Days = it },
                    modifier = Modifier.weight(1f)
                )
                Text(
                    text = "Forgot password",
                    style = TextStyle(
                        fontSize = 14.sp,
                        lineHeight = 20.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = HawkNeutral500
                    ),
                    modifier = Modifier.clickable(
                        indication = null,
                        interactionSource = remember { MutableInteractionSource() }
                    ) { }
                )
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        LoginButton(modifier = Modifier.fillMaxWidth())
    }
}

@Composable
private fun RememberRow(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = checked,
            onCheckedChange = onCheckedChange,
            modifier = Modifier.size(16.dp),
            colors = CheckboxDefaults.colors(
                checkedColor = HawkGray700,
                uncheckedColor = HawkGray300,
                checkmarkColor = Color.White
            )
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = "Remember for 30 days",
            style = TextStyle(
                fontSize = 14.sp,
                lineHeight = 20.sp,
                fontWeight = FontWeight.Medium,
                color = HawkGray700
            )
        )
    }
}

@Composable
private fun LabeledInput(
    label: String,
    value: String,
    placeholder: String,
    onValueChange: (String) -> Unit,
    visualTransformation: VisualTransformation
) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = label,
            style = TextStyle(
                fontSize = 14.sp,
                lineHeight = 20.sp,
                fontWeight = FontWeight.Medium,
                color = HawkGray700
            )
        )
        Spacer(modifier = Modifier.height(6.dp))
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            textStyle = TextStyle(
                fontSize = 16.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.Normal,
                color = HawkGray900
            ),
            singleLine = true,
            visualTransformation = visualTransformation,
            cursorBrush = SolidColor(HawkGray900),
            modifier = Modifier
                .fillMaxWidth()
                .shadow(
                    elevation = 1.dp,
                    shape = RoundedCornerShape(8.dp),
                    ambientColor = Color(0x0D101828),
                    spotColor = Color(0x0D101828)
                )
                .border(
                    BorderStroke(1.dp, HawkGray300),
                    RoundedCornerShape(8.dp)
                )
                .clip(RoundedCornerShape(8.dp))
                .background(Color.White)
                .padding(horizontal = 14.dp, vertical = 10.dp),
            decorationBox = { innerTextField ->
                if (value.isEmpty()) {
                    Text(
                        text = placeholder,
                        style = TextStyle(
                            fontSize = 16.sp,
                            lineHeight = 24.sp,
                            fontWeight = FontWeight.Normal,
                            color = HawkGray500
                        )
                    )
                }
                innerTextField()
            }
        )
    }
}

@Composable
private fun LoginButton(modifier: Modifier = Modifier) {
    Box(
        modifier = modifier
            .height(44.dp)
            .shadow(
                elevation = 1.dp,
                shape = RoundedCornerShape(8.dp),
                ambientColor = Color(0x0D101828),
                spotColor = Color(0x0D101828)
            )
            .border(
                BorderStroke(1.dp, Color(0xFF525252)),
                RoundedCornerShape(8.dp)
            )
            .clip(RoundedCornerShape(8.dp))
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(Color(0xFFD0D0D0), Color(0xFF434343))
                )
            )
            .clickable { },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = "Login",
            style = TextStyle(
                fontSize = 16.sp,
                lineHeight = 24.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
        )
    }
}

private val HawkGray900 = Color(0xFF101828)
private val HawkGray700 = Color(0xFF344054)
private val HawkGray600 = Color(0xFF475467)
private val HawkGray500 = Color(0xFF667085)
private val HawkGray300 = Color(0xFFD0D5DD)
private val HawkNeutral500 = Color(0xFF737373)

@Preview(showBackground = true, widthDp = 390, heightDp = 844)
@Preview(showBackground = true, widthDp = 1280, heightDp = 800)
@Composable
private fun LoginScreenPreview() {
    HawkTheme {
        LoginScreen()
    }
}
