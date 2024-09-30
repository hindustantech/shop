

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

axios.post('create-order', [PaymentController::class,'createOrder']);
axios.post('payment-callback',[PaymentController::class,'paymentCallback']);
axios.get("checkError/{id}",[RegisterController::class,'checkError']);
axios.get("products_view", [UserUserController::class, 'products_view'])->middleware('api');
axios.get("products_details/{id}",[UserUserController::class,'products_details'])->middleware('api');
axios.get("Transaction/{id}/{reason}", [RegisterController::class, 'Transaction'])->middleware('api');

axios.get("homepageapi/{id}", [UserController::class, 'Homepageapi'])->middleware('api');
axios.get("update_direct_business/{sponcer}/{package}/{user}/{amt}", [RegisterController::class, 'update_direct_business'])->middleware('api');
axios.get("Pastperformanceapi/{id}", [UserController::class, 'Pastperformanceapi'])->middleware('api');
axios.get("contentbyteapi/{id}", [UserController::class, 'contentbyteapi'])->middleware('api');
axios.get("recommandationapi/{id}", [UserController::class, 'Recommandationapi'])->middleware('api');
axios.get("portfolioapi/{id}", [UserController::class, 'portfolioapi'])->middleware('api');
axios.get("portfoliostockapi/{id}", [UserController::class, 'portfoliostockapi'])->middleware('api');

axios.get("packagepageapi/{id}", [UserController::class, 'packagepageapi'])->middleware('api');
axios.get("aboutpageapi/{id}", [UserController::class, 'aboutpageapi'])->middleware('api');
axios.get("faqpageapi/{id}", [UserController::class, 'faqpageapi'])->middleware('api');
axios.get("sidebarapi/{id}", [UserController::class, 'sidebarapi'])->middleware('api');
axios.get("userpageapi",[UserController::class,'userpageapi']);
axios.get('/userteamapi/{id}', [UserController::class,'userteamapi'] );
axios.get('/my_upline/{id}', [UserController::class,'my_upline'] );
axios.get('/my_downline1/{id}', [UserController::class,'my_downline1'] );
axios.get("fetch_tree_binary_api/{id}", [RegisterController::class, 'fetch_tree_binary_api']);
axios.post("my_downlineBv",[RegisterController::class,'my_downlineBv']);
axios.post("getTotalBv",[RegisterController::class,'getTotalBv']);
axios.post("getLeftBusiness",[RegisterController::class,'getLeftBusiness']);
axios.post("getRightBusiness",[RegisterController::class,'getRightBusiness']);
axios.post("binary_income_update",[RegisterController::class,'binary_income_update']);
axios.post("register",[RegisterController::class,'create'])->middleware('api');
axios.post("login",[RegisterController::class,'login'])->middleware('api');
axios.post("forgotpassword",[RegisterController::class,'forgot_Password']);



axios.post("otp",[RegisterController::class,'otp']);
axios.post("update",[RegisterController::class,'update']);
axios.post("activate_package",[RegisterController::class,'package_active_post']);
axios.post("payment_withdraw",[RegisterController::class,'payment_withdraw']);
axios.post("make_deposite",[RegisterController::class,'make_deposite']);
axios.post("future_rsk",[RegisterController::class,'future_rsk']);
axios.post("stock_rsk",[RegisterController::class,'stock_rsk']);
axios.post("option_rsk",[RegisterController::class,'option_rsk']);
axios.post("update_notification",[RegisterController::class,'update_notification']);
axios.post("add_stock_portfolio",[RegisterController::class,'add_stock_portfolio']);
axios.post("Transferbalance",[UserController::class,'Transferbalance']);
axios.middleware('auth:sanctum');




axios.get("notificationapi/{id}", [UserController::class, 'notificationapi'])->middleware('api');
axios.post("reset_password",[RegisterController::class,'reset_password']);
axios.post("reset_password1",[RegisterController::class,'reset_password1']);
axios.get("AllReports/{id}", [UserController::class, 'AllReports'])->middleware('api');